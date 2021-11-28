import db from "../../models";
import Sentry from "../../config/sentry";
const  Formula = db.formula;
const Op = db.Sequelize.Op;


const createNewFormula = async (_, params, context) => {
    
  try {
    let { code } = params;

    const existingFormula = await Formula.findByPk(code);

    if (existingFormula?.length) {
      return {
        message: 'The formula code provided already exists',
        code: 500,
        success: false,
      }
    }
    await Formula.create(params);

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
    const formulas = await Formula.findAll();
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

const updateFormula = async (_, params, context) => {
    
    try {
      let { code } = params;
  
      await Formula.update(params,{
         where:{
             code:code
         }
      });
      return {
        message: "Successfully Updated",
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

  const deleteFormula = async (_, params, context) => {

    try {
      let { code } = params;
  
      await Formula.destroy({
         where:{
             code:code
         }
      });
      return {
        message: "Successfully Deleted",
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

  const uploadFormulas = async (_, params, context) => {
    try {
        
        const formulas = JSON.parse(params.formulas)
        await Formula.bulkCreate(formulas);
        
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
  

const formulaProvider = {
  createNewFormula,
  getAllFormulas,
  updateFormula,
  deleteFormula,
  uploadFormulas
};

export default formulaProvider;
