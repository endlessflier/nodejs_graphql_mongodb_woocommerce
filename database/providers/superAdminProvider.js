import bcrypt from "bcrypt";
import { generateJWT } from "../../helpers/generateJWT";
import appSettingSchema from "../schemas/settingsSchma";
import supportSchema from "../schemas/supportSchema";
import formulaSchema from "../schemas/formulaSchema";
import layoutOneSchema from "../schemas/layoutOneSchema";
import layoutTwoSchema from "../schemas/layoutTwoSchema";
import layoutThreeSchema from "../schemas/layoutThreeSchema";
import adminSchema from "../schemas/adminSchema";
import sgMailProvider from "../../config/sendgrid";
import Sentry from "../../config/sentry";
import permissions from "../../config/permissions.json";
import User from "../schemas/User";
import { postgresClient } from "../db/postgresConnect";

// import {buildCSVFile} from "../../helpers/layoutThreeToCSV";


const authSuperAdmin = async (_, params, context) => {
  try {
    let { email, password } = params;
    const admin = await adminSchema.findOne({ email: email }).exec();
    if (admin && admin.adminLevels) {
      let compared = await bcrypt.compare(password, admin.password);
      if (compared) {
        const isEligibleUser = admin.adminLevels.includes(
          permissions.authSuperAdmin.level
        );
        if (!isEligibleUser) {
          Sentry.captureException({message:"You have not permission to login", admin});
          throw new Error("You have not permission to login");
        }

        let token = generateJWT(admin);
        return {
          code: 200,
          message: "Successfully Login",
          success: true,
          accessToken: token,
          admin: admin,
        };
      } else {
        Sentry.captureException({message:"Password is incorrect!",compared});
        throw new Error("Password is incorrect!");
      }
    } else {
      Sentry.captureException({message:"Email or Password is incorrect!",admin});
      throw new Error("Email or Password is incorrect!");
    }
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const getAppSettings = async (_, params, context) => {
  try {
    let result = await appSettingSchema.findOne({
      type: "current",
    });
    return result;
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const updateSettings = async (_, params, context) => {
  try {
    let { data } = params;
    await appSettingSchema.findOneAndUpdate(
      {
        type: "current",
      },
      {
        terms: data.terms,
        privacy: data.privacy,
        aboutUs: data.aboutUs,
        shippingPolicy: data.shippingPolicy,
        howitworks: data.howitworks,
        faqs: data.faqs,
      }
    );
    return {
      message: "successfully update",
      code: 200,
      success: true,
    };
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const sendMessage = async (_, params, context) => {
  try {
    let { data } = params;

    const msg = {
      to: "info@micabeauty.com", // Change to your recipient
      from: "info@micabeauty.com", // Change to your verified sender
      subject: "Contact Support",
      text: data.name,
      html: `<p> From: ${data.name}</p> <p> From: ${data.email}</p>  <p> Message: ${data.message}</p>`,
    };

    sgMailProvider
      .send(msg)
      .then((success) => {})
      .catch((error) => {});

    await supportSchema.create({
      name: data.name,
      email: data.email,
      message: data.message,
    });
    return {
      message: "successfully sent",
      code: 200,
      success: true,
    };
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const getMessages = async (_, params, context) => {
  try {
    let messages = await supportSchema.find({});

    return messages;
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const deleteMessage = async (_, params, { user }) => {
  try {
    const { id } = params;
    let deleteQuery = { _id: id };

    await supportSchema.deleteOne(deleteQuery);

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

const getLayoutOne = async (_, params, context) => {
  try {
    let layoutOne = await layoutOneSchema.find({});
    return layoutOne;
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const updateLayoutOne = async (_, params, context) => {
  try {
    let { layout, data } = params;
    await layoutOneSchema.findOneAndUpdate(
      {
        layout,
      },
      {
        data,
      }
    );
    return {
      message: `Layout ${layout} successfully updated.`,
      code: 200,
      success: true,
    };
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const addLayoutOne = async (_, params, context) => {
  try {
    let { layout, data } = params;
    await layoutOneSchema.create({
      layout,
      data,
    });
    return {
      message: "Successfully added.",
      code: 200,
      success: true,
    };
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const getLayoutTwo = async (_, params, context) => {
  try {
    let layoutOne = await layoutTwoSchema.find({});
    return layoutOne;
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const updateLayoutTwo = async (_, params, context) => {
  try {
    let { layout, data } = params;
    await layoutTwoSchema.findOneAndUpdate(
      {
        layout,
      },
      {
        data,
      }
    );
    return {
      message: `Layout ${layout} successfully updated.`,
      code: 200,
      success: true,
    };
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const addLayoutTwo = async (_, params, context) => {
  try {
    let { layout, data } = params;
    await layoutTwoSchema.create({
      layout,
      data,
    });
    return {
      message: "Successfully added.",
      code: 200,
      success: true,
    };
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const getLayoutThree = async (_, params, context) => {
  try {
    let layoutThree = await layoutThreeSchema.find({});

    let data = {
      data: JSON.stringify(layoutThree),
    };
  //  buildCSVFile(layoutThree)
    // console.log("layoutThree", layoutThree);

    return data;
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const updateLayoutThree = async (_, params, context) => {
  try {
    let { id, data } = params;
    const updateToDb = JSON.parse(data.replace(/'/g, '"') || "{}");
    await layoutThreeSchema.findByIdAndUpdate(id, { $set: updateToDb });
    return {
      message: `Layout successfully updated.`,
      code: 200,
      success: true,
    };
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};


const fetchCustomers = async (_, params, { user }) => {
  try {
    const { page, limit, query, select, sort } = params;
    const insertQuery = JSON.parse(query?.replace(/'/g, '"') || "{}");
    const selectedFields = JSON.parse(select?.replace(/'/g, '"') || "{}");
    const sortedFields = JSON.parse(sort?.replace(/'/g, '"') || "{}");
    const options = {
      select: selectedFields,
      page: page,
      limit: limit,
      sort: sortedFields
    };
    const users = await User.paginate(insertQuery, options);
    return {
      code: JSON.stringify(users || {}),
      success: true,
      message: "successfully fetched",
      status: 200,
    };
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const downloadCustomers = async (_, params, context) => {
  try {
    let Customers = await User.find({});

    let data = {
      data: JSON.stringify(layoutThree),
    };
  //  buildCSVFile(layoutThree)
    // console.log("layoutThree", layoutThree);

    return data;
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const uploadFormulas = async (_, params, context) => {
  try {
    const formulas = JSON.parse(params.formulas)
    await postgresClient.createMultipleFormulas(formulas)
    return {
      message: "Successfully Uploaded",
      code: 200,
      success: true,
    };
  } catch (error) {
    console.info('error', error)
    Sentry.captureException(error);
    return {
      message: error?.message,
      code: 500,
      success: false,
    } 
  }
};


const createNewFormula = async (_, params, context) => {
  try {
    let { code } = params;
    const existingFormula = await postgresClient.getFormula(code)

    if (existingFormula?.length) {
      return {
        message: 'The formula code provided already exists',
        code: 500,
        success: false,
      }
    }

    await postgresClient.createFormula(params) 
    return {
      message: "Successfully Created",
      code: 200,
      success: true,
    };
  } catch (error) {
    console.info('error', error)
    Sentry.captureException(error);
    return {
      message: error?.message,
      code: 500,
      success: false,
    } 
  }
};

const getAllFormulas = async (_, params, context) => {
  try {
    const formulas = await postgresClient.queryAllFormulas()
    return {
      message: "Successfully queried formulas",
      success: true,
      code: JSON.stringify(formulas),
    };
  } catch (error) {
    console.info('error', error)
    Sentry.captureException(error);
    return {
      message: error?.message,
      code: 500,
      success: false,
    } 
  }
};


const superAminProvider = {
  authSuperAdmin,
  getAppSettings,
  updateSettings,
  sendMessage,
  getMessages,
  deleteMessage,
  getLayoutOne,
  updateLayoutOne,
  addLayoutOne,
  getLayoutTwo,
  updateLayoutTwo,
  addLayoutTwo,
  getLayoutThree,
  updateLayoutThree,
  fetchCustomers,
  createNewFormula,
  getAllFormulas,
  uploadFormulas,
};

export default superAminProvider;
