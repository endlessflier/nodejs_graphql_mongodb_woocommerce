import { pubsub } from "../../graphql/resolvers/index";
import { ORDER_UPDATED } from "../../graphql/resolvers/index";
import bcrypt from "bcrypt";
let saltRounds = 10;
import adminSchema from "../schemas/adminSchema";
import orderSchema from "../schemas/orderSchema";
import addressSchema from "../schemas/addressSchema";
import userSchema from "../schemas/User";
import { getUser } from "../../helpers/getUser";
import sgMailProvider from "../../config/sendgrid";
import { verifyAdmin } from "../../templates/adminVerify";
import { generateJWT } from "../../helpers/generateJWT";
import Sentry from "../../config/sentry";
import permissions from "../../config/permissions.json";
import { getOrderDetails } from "./utils";
import { updateWoocommerceOrderStatus } from '../../helpers/woocommerce'
import cloudinary from "../../config/cloudinary";
import { CLOUDINARY_EXISTING_FOLDER_NAME } from "../../helpers/constants";
import { createSendleOrder, getSendleLabel } from "../../helpers/sendle";
import { generatePDFFromHTML, generateTemplate } from "../../helpers/docamatic";
import { moveCloudinaryImages } from "../../helpers/cloudinary";
import { assignLevelOneAdmin } from "./orderProvider";
import { printFullSizeDocument, printLabelDocument } from "../../helpers/printnode";

/**
 * THESE STATUS ARE COPIED IN THE SUPER ADMIN AND TABLET APP REPOS
 */
export const ORDER_STATUS = {
  ORDER_RECEIVED: "Order Received",
  TABLET_ADMIN_3: "Tablet Admin L3",
  TABLET_ADMIN_2: "Tablet Admin L2",
  TABLET_ADMIN_1: "Tablet Admin L1",
  FINAL_REVIEW: "Final Review",
  READY_FOR_PRODUCTION: "Ready For Production",
  SHIPPED: "Shipped"
}

const addAdmin = async (_, params, context) => {
  try {
    const { name, email, permissions, adminLevels, id, isOnline, password } = params;
    if (id && id !== "") {
      await adminSchema.findByIdAndUpdate(
        {
          _id: id,
        },
        { name, email, permissions, adminLevels, isOnline }
      );
      return {
        code: 200,
        success: true,
        message: "Successfully updated",
      };
    }

    let admin = await adminSchema.findOne({
      email,
    });
    const heading = "Micabeauty Account";
    const emailDescription = `Hey ${name} micabeauty foundation invite you to become a maintainer as a admin please click on button to activate your account`;
    if (admin && admin.password) {
      return {
        code: 409,
        success: false,
        message: "Admin already exists with this email",
      };
      // throw new Error("Admin already exists with this email");
    } else if (admin && !admin.password) {
      let token = generateJWT(admin);
      let link = `${process.env.ADMIN_DASHBOARD_URL}/admin/changePassword/${token}`;
      let htmlTemp = verifyAdmin(link, heading, emailDescription);
      var mailOptions = {
        from: process.env.SENDGRID_FROM_EMAIL,
        to: admin.email,
        subject: "Mica Admin Invitation",
        html: htmlTemp,
      };
      await sgMailProvider.send(mailOptions);
      return {
        code: 200,
        success: true,
        status:200,
        message: "Successfully sent Email",
      };
    } else {
      let one = adminSchema.create({ name, email, permissions, adminLevels });
      let token = generateJWT({ name, email });
      let link = `${process.env.ADMIN_DASHBOARD_URL}/admin/changePassword/${token}`;
      let htmlTemp = verifyAdmin(link, heading, emailDescription);
      var mailOptions = {
        from: process.env.SENDGRID_FROM_EMAIL,
        to: email,
        subject: "Mica Admin Invitation",
        html: htmlTemp,
      };
      let two = sgMailProvider.send(mailOptions);
      await Promise.all([one, two]);
      return {
        code: 200,
        status:200,
        success: true,
        message: "Successfully created",
      };
    }
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const adminForgetPassword = async (_, params, context) => {
  try {
    const { email } = params;

    let admin = await adminSchema.findOne({
      email,
    });
    const heading = "Micabeauty Account";
    const emailDescription = `Mica admin Reset Password.`;
    if (!admin) {
      return {
        code: 409,
        status:409,
        success: false,
        message: "Admin not exists with this email",
      };
      // throw new Error("Admin already exists with this email");
    }
    let token = generateJWT(admin);
    let link = `${process.env.ADMIN_DASHBOARD_URL}/admin/changePassword/${token}`;
    let htmlTemp = verifyAdmin(link, heading, emailDescription);
    var mailOptions = {
      from: process.env.SENDGRID_FROM_EMAIL,
      to: admin.email,
      subject: "Mica Admin Reset Password",
      html: htmlTemp,
    };
    await sgMailProvider.send(mailOptions);
    return {
      code: 200,
      status:200,
      success: true,
      message: "Successfully sent Email",
    };
  } catch (error) {
    Sentry.captureException({message:"admin reset password exception", email, error});
    throw new Error(error);
  }
};

const updateAdminPermission = async (_, params, context) => {
  try {
    const { name, email, permissions, adminLevels } = params;
    await adminSchema.findByIdAndUpdate(
      { email },
      { name, permissions, adminLevels }
    );
    return {
      code: 200,
      success: true,
      message: "Successfully updated",
    };
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const getAdmins = async (_, params, context) => {
  try {
    let { page, rowsPerPage } = params;
    let pageP = page * 10;
    let admins = await adminSchema
      .find({})
      .lean()
      .limit(rowsPerPage)
      .skip(pageP)
      .sort({ updatedAt: -1 });

    return admins;
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const updateAdmin = async (_, params, context) => {
  try {
    const { token, password } = params;
    let user = await getUser(token);
    let hash = await bcrypt.hash(password, saltRounds);
    let response = await adminSchema.findOneAndUpdate(
      { email: user.email },
      {
        $set: { password: hash, status: "registered" },
      },
      { new: true }
    );
    return {
      code: 200,
      success: true,
      message: "Successfully Added Password",
    };
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

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

const assignAdminSelf = async (_, params, { user }) => {
  try {
    let currentUser = await user;
    const { orderId } = params;
    let order = await orderSchema
      .findOneAndUpdate(
        {
          _id: orderId,
        },
        {
          assigner: currentUser._id,
          status: `admin self assign`,
        },
        { new: true }
      )
      .populate("user_id")
      .populate("address_id")
      .populate("assigner");
    // .populate("product");

    await updateAdminWorkLoad(currentUser._id);
    await pubsub.publish(ORDER_UPDATED, { order });

    return {
      code: 200,
      success: true,
      message: "Successfully Assigned",
    };
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const adminStatus = async (_, params, { user }) => {
  try {
    const { adminIds, status } = params;
    await adminSchema.updateMany(
      {
        _id: {
          $in: adminIds,
        },
      },
      {
        status,
      }
    );

    return {
      code: 200,
      success: true,
      message: "Successfully Updated Status",
    };
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const delAdmins = async (_, params, { user }) => {
  try {
    const { adminIds } = params;

    await adminSchema.deleteMany({
      _id: {
        $in: adminIds,
      },
    });
    return {
      code: 200,
      success: true,
      message: "Successfully Deleted",
    };
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const assignToAdmin = async (_, params, { user }) => {
  try {
    const { adminId, orderId } = params;
    let order = await orderSchema
      .findOneAndUpdate(
        {
          _id: orderId,
        },
        {
          assigner: adminId,
          status: `manual assign by superAdmin`,
        },
        {
          new: true,
        }
      )
      .populate("user_id")
      .populate("address_id")
      .populate("assigner");
    // .populate("product");
    await updateAdminWorkLoad(adminId);
    let resS = await pubsub.publish(ORDER_UPDATED, { order: order });

    return {
      code: 200,
      success: true,
      message: "Successfully Assigned!",
    };
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const adminLogin = async (_, params, context) => {
  try {
    let { email, password } = params;
    const admin = await adminSchema.findOne({ email: email }).exec();
    if (admin && admin.adminLevels) {
      let compared = await bcrypt.compare(password, admin.password);
      if (compared) {
        const isEligibleUser = admin.adminLevels.includes(
          permissions.adminLogin.level
        );
        if (!isEligibleUser) {
          Sentry.captureException({
            message: "You have not permission to login",
            isEligibleUser,
          });
          throw new Error("You have not permission to login");
        }
        let token = generateJWT(admin);
        return {
          accessToken: token,
          admin: admin,
          message: "Successfully Login",
        };
      }
    } else {
      Sentry.captureException({
        message: "Admin not Registered with this email"
      });
      throw new Error("Admin not Registered with this email");
    }
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const productAssign = async (_, params, { user }) => {
  const currentUser = await user;
  const { productOrder, orderId, assignedImage } = params;
  try {
    console.info('assignedImage', assignedImage)
    const isLevel3 = currentUser?.permissions?.tabletAdmin[0] === 'level3'
    const isLevel2 = currentUser?.permissions?.tabletAdmin.find(level => level === 'level2')
    const isLevel1 = currentUser?.permissions?.tabletAdmin.find(level => level === 'level1')
    // for level3
    if (isLevel3) {
      let order = await orderSchema.findOneAndUpdate(
        { _id: orderId },
        { product: productOrder, productAssigned: true, status: ORDER_STATUS.TABLET_ADMIN_2, assignedImage },
        { new: true }
      )
      .populate("user_id")
      .populate("address_id")
      .populate("assigner");

      if (order?.assigner) {
        await updateOrderAssigner({}, { orderID: order.id }, { user })
      }

      await pubsub.publish(ORDER_UPDATED, { orderData: order });

      return {
        code: 200,
        success: true,
        message: "Successfully Assigned!",
      };
    }

    // for level2
    let order = await orderSchema
      .findOneAndUpdate(
        {
          _id: orderId,
        },
        {
          product: productOrder,
          productAssigned: true,
          assignedImage,
        },
        { new: true }
      )
      .populate("user_id")
      .populate("address_id")
      .populate("assigner");

    if (isLevel2) {
      await orderSchema.findByIdAndUpdate(
        { _id: order._id },
        {
          product: productOrder,
          productAssigned: true,
          status: ORDER_STATUS.FINAL_REVIEW,
        }
      );

      if (order?.assigner) {
        await updateAdminWorkLoad(order?.assigner, "decrement");
        await assignLevelOneAdmin(order.id, ORDER_STATUS.FINAL_REVIEW)
      }

      await moveCloudinaryImages(order._id,
        {
          camera_image_1: order.thumbs[0],
          camera_image_2: order.thumbs[1],
          camera_image_3: order.thumbs[2],
          camera_image_4: order.thumbs[3],
        },
        true,
      )
    }

    if (isLevel1) {
      if (order?.woocommerceOrderCreated) {
        await orderSchema.findByIdAndUpdate(
          { _id: order._id },
          {
            status: ORDER_STATUS.READY_FOR_PRODUCTION,
          }
        );
  
        if (order?.assigner) {
          await updateAdminWorkLoad(order?.assigner, "decrement");
        }
  
        await updateWoocommerceOrderStatus(order?.woocommerceOrderId, 'processing')
      }
    }

    await pubsub.publish(ORDER_UPDATED, { orderData: order });


    return {
      code: 200,
      success: true,
      message: "Successfully Assigned!",
    };
  } catch (error) {
    console.info('ERROR In Assigning Order', error)
    Sentry.captureException({error, productOrder, orderId, currentUser });
    throw new Error(error);
  }
};

const setMaxAssignedOrders = async (_, params, { user }) => {
    try {
        const {count} = params;
        const curAdmin = await user;
        let response = await adminSchema.findOneAndUpdate(
            {
                _id: curAdmin._id,
            },
            {
                maxAssignedOrders: count,
                },
            {
                new: true,
            });

        return {
            success: true,
            status: 200,
            code: response.maxAssignedOrders,
            message: "Admin  has been set",
        };

    } catch (error) {
        console.log("error", error);

        Sentry.captureException(error);
        throw new Error(error);
    }
};

const updateAdminStatus = async (_, params, { user }) => {
  try {
    const currentUser = await user;
    const { isOnline } = params;
        let admin = await adminSchema.findOne(
      {
        _id: currentUser._id,
            }
        );
        admin.isOnline = true;
        admin.save();

        let maxAssignedOrders = admin.maxAssignedOrders ? admin.maxAssignedOrders : 100;

        const level = admin?.permissions?.tabletAdmin[0];
        let adminLevel = "L1";
        if (level === "level3") {
            adminLevel = "L2";
        } else if (level === "level2") {
            adminLevel = "L1";
        }
        if (!isOnline) {
            // get maxAssignedOrders count pending Orders, by sort _id
            let pendingOrders = await orderSchema.find({status: `Tablet Admin ${adminLevel} - Assign Pending`}).sort(['_id', 1]).limit(maxAssignedOrders);
            console.log("error", pendingOrders);
            for (const orderIndex in pendingOrders) {
                let order = await orderSchema
                    .findOneAndUpdate(
                        {
                            _id: pendingOrders[orderIndex]._id,
      },
      {
                            assigner: admin._id,
                            status: `Tablet Admin ${adminLevel}`,
                        }
                    )
                    .populate("user_id")
                    .populate("address_id")
                    .populate("assigner");

                await updateAdminWorkLoad(admin._id);

                await pubsub.publish(ORDER_UPDATED, { order: order });
            }
      }
    return {
      isOnline: isOnline,
      success: true,
      message: "successfully updated",
      status: 200,
    };
  } catch (error) {
    console.log("error", error);

    Sentry.captureException(error);
    throw new Error(error);
  }
};

const getAdminStatus = async (_, params, { user }) => {
  try {
    console.info('USER', user)
    const currentUser = await user;
    let admin = await adminSchema.findOne({
      _id: currentUser?._id,
    });

    return {
      isOnline: admin.isOnline || false,
      success: true,
      message: "successfully found",
      status: 200,
    };
  } catch (error) {
    console.log("error", error);
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const getAdminsStatus = async (query) => {
  return adminSchema
    .find({
      status: "registered",
      adminLevels: { $all: ["tabletAdmin"] },
      ...query,
    })
    .sort({ activeOrders: 1 })
    .limit(1);
};

const updateOrderAssigner = async (_, params, { user }) => {
  try {
    console.info('UPDATE ASSIGNED - updateOrderAssigner', params)
    const { orderID } = params;
    const currentUser = await user;
    const level = currentUser?.permissions?.tabletAdmin[0];
    let adminLevel = "L1";
    let assignerLevel = "level1";
    if (level === "level3") {
      assignerLevel = "level2";
      adminLevel = "L2";
    } else if (level === "level2") {
      assignerLevel = "level1";
      adminLevel = "L1";
    }

    let admins = [];
    admins = await getAdminsStatus({
      isOnline: true,
      "permissions.tabletAdmin": { $all: [assignerLevel] },
    });

        if (admins && admins.length) {
            let assignerId = admins[0]._id;

    let order = await orderSchema
      .findOneAndUpdate(
        {
          _id: orderID,
        },
        {
                        assigner: assignerId,
          status: `Tablet Admin ${adminLevel}`,
        }
      )
      .populate("user_id")
      .populate("address_id")
      .populate("assigner");

            await updateAdminWorkLoad(assignerId);

    await pubsub.publish(ORDER_UPDATED, { order: order });
        } else {

            await orderSchema
                .findOneAndUpdate(
                    {
                        _id: orderID,
                    },
                    {
                        status: `Tablet Admin ${adminLevel} - Assign Pending`,
                    }
                );
        }

    return {
      code: 200,
      success: true,
      message: "Successfully Assigned!",
    };
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const getStorageFolders = async (_, params, context) => {
  try {
    const { max_results, next_cursor, folderPath } = params;

    const folders = await cloudinary.v2.api.sub_folders(folderPath, {
      max_results,
      next_cursor,
    });

    return {
      success: true,
      status: 200,
      code: JSON.stringify(folders),
      message: "List of folders",
    };
  } catch (err) {
    Sentry.captureException(err);
    throw new Error(err);
  }
};

const getFilesInFolder = async (_, params, context) => {
  try {

    const { max_results, next_cursor, folderPath } = params;

    const files = await cloudinary.v2.search
      .expression(folderPath)
      .next_cursor(next_cursor)
      .max_results(max_results)
      .execute();

    console.log("files", files);

    return {
      success: true,
      status: 200,
      code: JSON.stringify(files),
      message: "List of files",
    };
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const getCurrentAdminUser = async (_, params, { user }) => {
  try {
    let currentUser = await user;
    const admin = await adminSchema.findOne({ _id: currentUser._id }).exec();
    if (admin) {
      let token = generateJWT(admin);
      return {
        accessToken: token,
        admin: admin,
        message: "User Found",
        status: 200,
      };
    }
    return {
      message: "Session has been expired, Please login again!",
      status: 300,
    };
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

export const generateAndPrintRequiredLabels = async (params) => {
  try {
    const { order } = params
    const user = await userSchema.findOne({ _id: order.user_id }).exec();
    const address = await addressSchema.findOne({ _id: order.address_id }).exec();

    if (!user) {
      return {
        message: "User Not Found",
        status: 500,
      };
    }

    const subTotal = `${order.subTotal / 100}`
    const salesTax = `$${order.tax / 100}`
    const total = `$${order.total / 100}`

    const shippingResponse = await createSendleOrder(order, user, address)
    const nameLabel = await generatePDFFromHTML(`<html><div style="transform: rotate(90deg);"><h1>${user.name}</h1></div></html>`, 2, 1)
    const packingSlipUrl = await generateTemplate({
      template: "packing_slip",
      data: {
          "order_number": order._id,
          "order_date": order.createdAt,
          "shipping": shippingResponse.tracking_url,
          "total_items": 1,
          "bill_to": {
              "name": user.name,
              "address1": address.address1,
              "address2": address.address2,
              "telephone": address.phone,
          },
          "ship_to": {
              "name": user.name,
              "address1": address.address1,
              "address2": address.address2,
              "telephone": address.phone,
          },
          "items": [
              {
                "image": "https://jfy.micabeauty.com/wp-content/uploads/2021/08/JustForYou_front_L0A7635.png",
                "description": "Just For You Foundation",
                "sku": "JFY-1",
                "barcode": order.formulaCode,
                "quantity": 1,
                "price": subTotal,
                "total": total,
              }
          ],
          "note": "",
          "message_title": "Thanks for your business!",
          "message_body": "If you have any questions please get in contact with us.",
          "company": {
            "logo": "https://micabeauty.com/wp-content/uploads/2021/07/MICA-logo-1-1.png",
            "name": "Mica Beauty",
            "address": "902 Columbia Ave, Riverside Ca, 92507",
            "contact": "info@micabeauty.com",
            "website": "micabeauty.com",
          },
          "color": "#000000"
      }
    })
    const invoiceUrl = await generateTemplate({
      "template": "invoice1",
      "data": {
          "order_number": order._id,
          "order_date": order.createdAt,
          "shipping": shippingResponse.sendle_reference,
          "total_items": 1,
          "bill_to": {
            "name": user.name,
            "address1": address.address1,
            "address2": address.address2,
            "telephone": address.phone,
          },
          "ship_to": {
              "name": user.name,
              "address1": address.address1,
              "address2": address.address2,
              "telephone": address.phone,
          },
          "items": [
            {
              "image": "https://jfy.micabeauty.com/wp-content/uploads/2021/08/JustForYou_front_L0A7635.png",
              "description": "Just For You Foundation",
              "sku": "JFY-1",
              "barcode": order.formulaCode,
              "quantity": 1,
              "price": subTotal,
              "total": total,
            }
          ],
          "note": "",
          "discount": "",
          "subtotal": subTotal,
          "shipping_total": "",
          "sales_tax_percentage": "",
          "sales_tax": salesTax,
          "total": total,
          "message_title": "Thanks for your business!",
          "message_body": "If you have any questions please get in contact with us.",
          "company": {
            "logo": "https://micabeauty.com/wp-content/uploads/2021/07/MICA-logo-1-1.png",
            "name": "Mica Beauty",
            "address": "902 Columbia Ave, Riverside Ca, 92507",
            "contact": "info@micabeauty.com",
            "website": "micabeauty.com",
          },
          "color": "#000000"
      }
    })

    const labelUrl = await getSendleLabel(shippingResponse?.label)
    await printFullSizeDocument(labelUrl)
    await printFullSizeDocument(packingSlipUrl)
    await printFullSizeDocument(invoiceUrl)
    await printLabelDocument(nameLabel)
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const adminProvider = {
  addAdmin,
  adminForgetPassword,
  updateAdmin,
  assignAdminSelf,
  adminStatus,
  assignToAdmin,
  delAdmins,
  productAssign,
  getAdmins,
  adminLogin,
  updateAdminPermission,
  updateAdminStatus,
  getAdminStatus,
  updateOrderAssigner,
  getStorageFolders,
  getFilesInFolder,
  getCurrentAdminUser,
};

export default adminProvider;