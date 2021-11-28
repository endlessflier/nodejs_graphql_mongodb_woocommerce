import BrandFoundationOptions from "../schemas/brandFoundationSchema";
import Sentry from "../../config/sentry";

const getBrandFoundationOptions = async (_, params, context) => {
  try {
    const brandFoundations = await BrandFoundationOptions.find({});
    console.info('brandFoundations', brandFoundations)
    return {
      code: 200,
      success: true,
      message: "Brand Foundation Data",
      data: brandFoundations,
    };
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const brandFoundationProvider = {
    getBrandFoundationOptions,
};

export default brandFoundationProvider;
