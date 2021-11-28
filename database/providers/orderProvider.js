import * as axios from "axios";

import orderSchema from "../schemas/orderSchema";
import addressSchema from "../schemas/addressSchema";
import adminSchema from "../schemas/adminSchema";
import Sentry from "../../config/sentry";
import User from "../schemas/User";
import { ORDER_UPDATED } from "../../graphql/resolvers/index";
import { pubsub } from "../../graphql/resolvers/index";
import recurlyApi from "../../helpers/recurly";
import chargebeeApi from "../../helpers/chargebee";
import { createWoocommerceOrder } from "../../helpers/woocommerce";
import { DEFAULT_COUNTRY, DEFAULT_PLAN_ID } from "../../helpers/constants";
import { generateAndPrintRequiredLabels , ORDER_STATUS } from './adminProvider'
import { generateRandomString, generateUniqueAssigmentCode } from "../../helpers/utils";
import { Auth0 } from "../../helpers/auth0Middleware";

const addOrder = async (_, params, { user, versionCode }) => {
  try {
    let currentUser = await user;
    let { files, shipping, shadeCodes, planId, subscriptionID } = params;
    if (
      currentUser &&
      files &&
      shadeCodes &&
      planId &&
      subscriptionID &&
      shipping
    ) {
      const addressData = {
        user_id: currentUser._id,
        firstName: shipping.first_name,
        lastName: shipping.last_name,
        address1: shipping.address1,
        address2: shipping.address2,
        city: shipping.city,
        company: shipping.company,
        country: shipping.country,
        phone: shipping.phone,
        zip_code: shipping.zip_code,
      };
      let resOne = await addressSchema.create(addressData);

      const newOrder = await orderSchema.create({
        user_id: currentUser._id,
        address_id: resOne._id,
        shadeCodes: shadeCodes,
        subscriptionID,
        planId,
        thumbs: files,
        status: "order_placed",
      });

      assignAdmin(newOrder._id);
      // throw new Error("Invalid params!");
      return {
        success: true,
        code: 200,
        message: "Successfully Created Order",
      };
    } else {
      Sentry.captureException({
        message: "Invalid Params",
        currentUser,
        files,
        shadeCodes,
        shipping,
        token,
      });
      throw new Error("Invalid params!");
    }
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

export const createDefaultJFYSubscription = async (params) => {
  try {
    let user_id = 0;
    let chargebeeCustomerId = null;
    let createSubscriptionResponse
    let newUser

    // If billing address isn't provided use shipping address
    if (!params.billing_address_1 || params.billing_address_1 === '') {
      params.billing_first_name = params.shipping_first_name
      params.billing_last_name = params.shipping_last_name
      params.billing_address_1 = params.shipping_address_1
      params.billing_address_2 = params.shipping_address_2
      params.billing_city = params.shipping_city
      params.billing_state = params.shipping_state,
      params.billing_zipcode = params.shipping_zipcode
      params.billing_phone = params.shipping_phone
    }

    const auth0Instance = new Auth0()
    const auth0User = await auth0Instance.getAuth0UserByEmail(params.email)

    // checking if user exists
    let user = await User.findOne({ email: params.email }).exec();

    if (user) {
      user_id = user._id;
      chargebeeCustomerId = user.chargebeeCustomerID
    } else {
      if (!auth0User) {
        // creating auth0 user
        await axios.post(`https://${process.env.AUTH0_DOMAIN}/dbconnections/signup`, {
          client_id: process.env.AUTH0_CLIENT_ID,
          email: params.email,
          password: params.password,
          connection: process.env.AUTH0_CONNECTION,
          name: `${params.shipping_first_name} ${params.shipping_last_name}`,
        });
      }

      // creating new user
      const userModel = new User({
        email: params.email,
        password: params.password || `meca-11`,
        name: `${params.shipping_first_name} ${params.shipping_last_name}`,
        image: "https://res.cloudinary.com/daxfzj6pg/image/upload/v1607027894/no_img_n6c8sp.jpg",
      });

      newUser = await userModel.save();

      user_id = newUser._id;
    }

    const address = await addressSchema.create({
      user_id: user_id,
      firstName: params.shipping_first_name,
      lastName: params.shipping_last_name,
      address1: params.shipping_address_1,
      address2: params.shipping_address_2,
      city: params.shipping_city,
      state: params.shipping_state,
      zip_code: params.shipping_zipcode,
      email: params.email,
      phone: params.shipping_phone,
      country: DEFAULT_COUNTRY,
    });

    // creating subscription
    const subscriptionData = {
      planId: DEFAULT_PLAN_ID,
      shippingAddress: {
        first_name: address.firstName,
        last_name: address.lastName,
        line1: address.address1,
        line2: address.address2,
        city: address.city,
        phone: address.phone,
        state: address.state,
        zip: address.zip_code,
        country: address.country
      },
      billingAddress: {
        first_name: params.billing_first_name,
        last_name: params.billing_last_name,
        line1: params.billing_address_1,
        line2: params.billing_address_2,
        city: params.billing_city,
        phone: params.billing_phone,
        state: params.billing_state,
        zip: params.billing_zipcode,
        country: DEFAULT_COUNTRY,
      },
      customer: {
        first_name: address.firstName,
        last_name: address.lastName,
        email: params.email,
        phone: params.billing_phone
      },
      tokenId: params.cbToken,
    };

    if (params.addons) {
      const addons = [];
      const subAddons = params.addons.split(" ");

      subAddons.forEach((x) => {
        addons.push({
          id: x,
        });
      });

      subscriptionData.addons = addons;
    }

    // Handle returning customers, create a new payment source if cbToken provided. Otherwise create subscription
    // If customer is new then create chargebee subscription/customer together
    if (chargebeeCustomerId) {
      let paymentSource
      if (params.cbToken) {
        paymentSource = await chargebeeApi.createPaymentSource({
          customer_id: chargebeeCustomerId,
          cbToken: params.cbToken,
        })
      }

      createSubscriptionResponse = await chargebeeApi.createSubscriptionForExistingCustomer({
        ...subscriptionData,
        chargebeeCustomerId,
        paymentSourceId: paymentSource ? paymentSource?.payment_source?.id : null,
      })
    } else {
      createSubscriptionResponse = await chargebeeApi.createSubscription(subscriptionData)
    }

    const { subscription, customer, invoice } = createSubscriptionResponse || {}

    if (!subscription?.id) {
      Sentry.captureEvent({
        message: "Unable to create new subscription",
        data: params,
        subscriptionData,
        subscription,
        customer,
      });
      throw Error('Unable to create subcription')
    }

    if (newUser) {
      // Update user with Chargebee new customer id
      await User.updateOne({ _id: user_id }, { chargebeeCustomerID: customer.id }).exec();
    }

    let customerUniqueCode = generateRandomString()
 
    // If code already exists, generate a new one
    const existingOrder = await orderSchema.find({ customerUniqueCode })
    if (existingOrder.length < 0) {
      customerUniqueCode = generateRandomString()
    }

    customerUniqueCode = customerUniqueCode?.toUpperCase()

    const assignmentCode = generateUniqueAssigmentCode(customerUniqueCode, params.base, params.coverage)

    const orderRecord = await orderSchema.create({
      nickname: params.nickname,
      user_id: user_id,
      address_id: address._id,
      planId: DEFAULT_PLAN_ID,
      subscriptionID: subscription.id,
      primaryColor: params.primaryColor, // TODO: Fix frontend params 
      layoutSelection: params.primaryColor,
      coverageCode: params.coverage,
      baseCode: params.base,
      product:params.product || "",
      faceRgb:params.faceRgb,
      brand:params.brand || "",
      requiresInitialAssignment: true,
      thumbs: [params.camera_image_1, params.camera_image_2, params.camera_image_3, params.camera_image_4],
      camera_image_1: params.camera_image_1,
      camera_image_2: params.camera_image_1,
      camera_image_3: params.camera_image_1,
      camera_image_4: params.camera_image_1,
      total: invoice?.total,
      subTotal: invoice?.sub_total,
      tax: invoice?.tax,
      customerUniqueCode,
      assignmentCode,
    });

    // These below processes will fail silently on error to prevent the entire order from erroring out.
    // Errors are being logged
    await assignLevelOneAdmin(orderRecord.id)
    const woocommerceOrderResponse =  await createWoocommerceOrder(address, subscription, customer, orderRecord)
    const { woocommerceOrderId } = woocommerceOrderResponse || {}

    if (woocommerceOrderId) {
      await orderSchema.findByIdAndUpdate(orderRecord.id, {
        woocommerceOrderCreated: true,
        woocommerceOrderId,
      })
    }

    const response = {
      success: true,
      status: 200,
      orderId: orderRecord._id,
      createdAt: orderRecord.createdAt,
      message: "Successfully Created Order",
    };

     Sentry.captureEvent({
        message: "New Order Created",
        data: params,
        subscription: subscription,
    });

    return response
  } catch (err) { 
    console.log("Error Log Order Creation", err);
    Sentry.captureException({
        error: err,
        message: "Error Log Order Creation",
        data: params
    });
    throw err
  }
}

const updateAdminWorkLoad = async (adminId, type = "increment") => {
  let updatedObj = { activeOrders: 1 };

  if (type === "decrement") {
    updatedObj = { activeOrders: -1 };
  }

  await adminSchema.findOneAndUpdate(
    {
      _id: adminId,
    },
    { $inc: updatedObj }
  );
};

export const assignLevelOneAdmin = async (orderID, status) => {
  console.log("orderID in method", orderID);
  try {
    // find online admin with less workload
    let admins = [];
    let adminLevel = "";
    admins = await getAdmins({
      isOnline: true,
      "permissions.tabletAdmin": { $all: ["level1"] },
    });
    adminLevel = "L1";

    if (!admins || !admins.length) {
      admins = await getAdmins({
        isOnline: false,
        "permissions.tabletAdmin": { $all: ["level1"] },
      });
      adminLevel = "L1";
    }

    const selectedAdmin = admins?.[0];

    if (selectedAdmin) {
      const adminId = selectedAdmin._id;

      const updatedOrder = await orderSchema
        .findOneAndUpdate(
          {
            _id: orderID,
          },
          {
            assigner: adminId,
            status: status || `Tablet Admin ${adminLevel}`,
          },
          {
            new: true,
          }
        )
        .populate("user_id")
        .populate("address_id")
        .populate("assigner");

      await updateAdminWorkLoad(adminId);
      // Sentry.captureException({message:"check order for pubsub", updatedOrder});
      await pubsub.publish(ORDER_UPDATED, { order: updatedOrder });
    } else {
      console.info('NO ADMIN FOUND')
      Sentry.captureException({
        message: "No admin found",
        admins,
        orderID,
      });
      throw new Error("No admin found");
    }
  } catch (error) {
    console.info('Error funding admin', error)
    Sentry.captureException({
      error,
      orderID,
      status,
    });
  }
};

const getAdmins = async (query) => {
  return adminSchema
    .find({
      status: "registered",
      ...query,
    })
    .sort({ activeOrders: 1 })
    .limit(1);
};

// activeOrders;
const assignAdmin = async (orderID) => {
  console.log("orderID in method", orderID);
  try {
    // find online admin with less workload

    let admins = [];
    let adminLevel = "";
    admins = await getAdmins({
      isOnline: true,
      "permissions.tabletAdmin": { $all: ["level3"] },
    });
    adminLevel = "L3";

    if (!admins || !admins.length) {
      admins = await getAdmins({
        isOnline: true,
        "permissions.tabletAdmin": { $all: ["level2"] },
      });
      adminLevel = "L2";
    }

    if (!admins || !admins.length) {
      admins = await getAdmins({
        isOnline: true,
        "permissions.tabletAdmin": { $all: ["level1"] },
      });
      adminLevel = "L1";
    }

    if (!admins || !admins.length) {
      admins = await getAdmins({
        isOnline: false,
        "permissions.tabletAdmin": { $all: ["level3"] },
      });
      adminLevel = "L3";
    }

    if (!admins || !admins.length) {
      admins = await getAdmins({
        isOnline: false,
        "permissions.tabletAdmin": { $all: ["level2"] },
      });
      adminLevel = "L2";
    }

    if (!admins || !admins.length) {
      admins = await getAdmins({
        isOnline: false,
        "permissions.tabletAdmin": { $all: ["level1"] },
      });
      adminLevel = "L1";
    }

    const selectedAdmin = admins?.[0];

    if (selectedAdmin) {
      const adminId = selectedAdmin._id;

      const updatedOrder = await orderSchema
        .findOneAndUpdate(
          {
            _id: orderID,
          },
          {
            assigner: adminId,
            status: `Tablet Admin ${adminLevel}`,
          },
          {
            new: true,
          }
        )
        .populate("user_id")
        .populate("address_id")
        .populate("assigner");

      await updateAdminWorkLoad(adminId);
      // Sentry.captureException({message:"check order for pubsub", updatedOrder});
      await pubsub.publish(ORDER_UPDATED, { order: updatedOrder });
    } else {
      Sentry.captureException({
        message: "No admin found",
        admins,
      });
      throw new Error("No admin found");
    }
  } catch (error) {
    Sentry.captureException(error);
  }
};

const changeOrderStatus = async (_, params) => {
  try {
    let { id, status } = params;

    if (id && status) {
      await orderSchema.findOneAndUpdate({ _id: id }, { status });

      return {
        code: 200,
        success: true,
        message: `Status updated successfully.`,
      };
    } else {
      Sentry.captureException({ message: "Invalid params.", params });
      throw new Error("Invalid params.");
    }
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

export const assignFormulaCode = async (_, params) => {
  try {
    let { id, formulaCode, printLabels } = params;

    if (id && formulaCode) {
      const order = await orderSchema.findOneAndUpdate({ _id: id }, { formulaCode });

      if (printLabels) {
        await generateAndPrintRequiredLabels({ order })
      }

      return {
        code: 200,
        success: true,
        message: `Formula Code updated successfully.`,
      };
    } else {
      Sentry.captureException({ message: "Invalid params.", params });
      throw new Error("Invalid params.");
    }
  } catch (error) {
    Sentry.captureException(error);
    return {
      code: 500,
      success: false,
      message: error?.message,
    };
  }
};

const getOrder = async (orderId) => {
  try {
    let order = await orderSchema.findOne({ _id: orderId });
    return order;
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const getOrders = async (_, params, context) => {
  try {
    let { page, rowsPerPage } = params;
    let pageP = page * 10;
    let orders = await orderSchema
      .find({})
      .limit(rowsPerPage)
      .skip(pageP)
      .sort({ updatedAt: -1 })
      .populate("user_id")
      .populate("address_id")
      .populate("assigner");

    return orders;
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

// const updateOrders = async () => {
//   const orderSchemaRate = await orderSchema.find({});
//   let orders = await orderSchema.updateMany(
//     { product: { $ne: "" } },
//     { $set: { productAssigned: true } }
//   );
//   console.log("orders", orders);
// };

const fetchOrders = async (_, params, { user }) => {
  try {
    const { page, limit, query, select, sort } = params;
    console.info('query', query)
    const insertQuery = JSON.parse(query?.replace(/'/g, '"') || "{}");
    const selectedFields = JSON.parse(select?.replace(/'/g, '"') || "{}");
    const sortedFields = JSON.parse(
      sort?.replace(/'/g, '"') || '{"createdAt":-1}'
    );
    console.info('params', params)

    const options = {
      page: page,
      limit: limit,
      sort: sortedFields,
    };

    var myAggregate = orderSchema.aggregate([
      {
        $lookup: {
          from: "admins",
          localField: "assigner",
          foreignField: "_id",
          as: "assigner",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user_id",
        },
      },
      {
        $lookup: {
          from: "addresses",
          localField: "address_id",
          foreignField: "_id",
          as: "address_id",
        },
      },
      {
        $unwind: "$assigner",
      },
      {
        $unwind: "$user_id",
      },
      {
        $unwind: "$address_id",
      },
      { $project: selectedFields },
      { $match: insertQuery },
    ]);

    const orders = await orderSchema.aggregatePaginate(myAggregate, options);
    console.info('orders', orders)

    return {
      code: JSON.stringify(orders || {}),
      success: true,
      message: "successfully fetched",
      status: 200,
    };
  } catch (error) {
    console.log("error", error);
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const validateCouponCode = async (_, params, context) => {
  try {
    const { couponCode } = params;
    if (couponCode) {
      const data = await recurlyApi.validateCouponCode(couponCode);
      return {
        success: true,
        status: 200,
        code: JSON.stringify(data),
        message: "Coupon is Valid",
      };
    } else {
      Sentry.captureException({
        message: "Coupon code not found!",
        couponCode,
      });
      throw new Error("Coupon code not found!");
    }
  } catch (error) {
    console.log("error", error);
    Sentry.captureException(error);
    throw new Error(error);
  }
};


const orderUpdate = async (_, params, context) => {
  const { orderID, update } = params;
  try {

    const updatedFields = JSON.parse(update?.replace(/'/g, '"') || "{}");
    console.info('updatedFields', updatedFields)
    const updatedOrder = await orderSchema
      .findOneAndUpdate({ _id: orderID }, updatedFields, {
        new: true,
      })
      .populate("user_id")
      .populate("address_id")
      .populate("assigner");
      

    if (updatedFields.correction || updatedFields.requiresInitialAssignment) {
      await updateAdminWorkLoad(updatedOrder.assigner._id,'decrement');
    }
    if ((!updatedFields.correction || !updatedFields.requiresInitialAssignment) && updatedFields.shadeCodes) {
      assignAdmin(updatedOrder._id);
    }
    await pubsub.publish(ORDER_UPDATED, { order: updatedOrder });
    return {
      success: true,
      status: 200,
      code: JSON.stringify(updatedOrder || {}),
      message: "order has been updated",
    };
  } catch (error) {
    Sentry.captureException({
      message: "order update",
      orderID,
      update,
      error,
    });
    throw new Error(error);
  }
};

const orderProvider = {
  addOrder,
  assignFormulaCode,
  getOrders,
  orderUpdate,
  fetchOrders,
  getOrder,
  changeOrderStatus,
  validateCouponCode,
};

export default orderProvider;
