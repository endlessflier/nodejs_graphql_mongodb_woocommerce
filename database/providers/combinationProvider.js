import Color from "../schemas/combinationSchema";
import Sentry from "../../config/sentry";
import { checkPriority } from "./utils";
import { uniqueCode } from "./utils";

const getColorCode = async (_, params, context) => {
  try {
    const { combinations } = params;
    const checkCombination = await Color.findOne({ combination: combinations });
    console.log("checkCombination", checkCombination);
    if (checkCombination) {
      return {
        code: 200,
        success: true,
        message: "color assigned",
        colorCode: checkCombination.colorCode,
        status: 1,
      };
    } else {
      // REgEx if combination is an array
      const leadingChars = combinations?.toString().replace(/[^a-zA-Z]/g, "");
      //   CHECK PRIORITY LETTER
      const getType = checkPriority(leadingChars);
      const code = await uniqueCode(getType);
      try {
        await Color.create({
          combination: combinations,
          colorCode: code,
          type: getType,
        });
      } catch (error) {
        Sentry.captureException({ error, combinations, code, getType });
      }

      return {
        code: 200,
        success: true,
        message: "color assigned",
        colorCode: code,
        status: 1,
      };
    }
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const combinationProvider = {
  getColorCode,
};

export default combinationProvider;
