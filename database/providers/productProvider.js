import Sentry from "../../config/sentry";
import recurlyApi from "../../helpers/recurly";
import productSchema from "../schemas/productSchema";

const addProduct = async (_, params, context) => {
  try {
    let { name, image, price } = params;
    await productSchema.create({
      name,
      image,
      price,
    });
    return {
      success: true,
      code: 200,
      message: "Successfully Created product",
    };
  } catch (error) {
    Sentry.captureException(error)
    throw new Error(error);
  }
};

const getProducts = async (_, params, context) => {
  try {
    let { page, rowsPerPage } = params;
    let pageP = page * 10;
    let products = await productSchema
      .find({})
      .limit(rowsPerPage)
      .skip(pageP)
      .sort({ createdAt: -1 });
    return products;
  } catch (error) {
    Sentry.captureException(error)
    throw new Error(error);
  }
};

const getListPlans = async (_, params, context) => {
  try {
    const plans = await recurlyApi.getListPlans();
    return {
      success: true,
      status: 200,
      code: JSON.stringify(plans),
      message: "List of Subscriptions and Addons",
    }
  } catch (error) {
    Sentry.captureException(error)
    throw new Error(error);
  }
};


const productProvider = {
  addProduct,
  getProducts,
  getListPlans
};

export default productProvider;
