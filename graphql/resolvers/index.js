import { PubSub } from "apollo-server";
export const pubsub = new PubSub();
import {
  superAminProvider,
  productProvider,
  UserProvider,
  orderProvider,
  adminProvider,
  combinationProvider,
} from "../../database";
import IdScalers from "../scalers/objectId";
import dateScalar from "../scalers/date";

const {
  authSuperAdmin,
  getAppSettings,
  updateSettings,
  getMessages,
  sendMessage,
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
} = superAminProvider;

const { addProduct, getProducts, getListPlans } = productProvider;

const {
  addUser,
  loginUser,
  userUpdate,
  socialAuth,
  passwordReset,
  passwordChanged,
  userOrders,
  getOrderShadeCode,
  getCurrentUser,
  
} = UserProvider;

const {
  addOrder,
  getOrders,
  fetchOrders,
  changeOrderStatus,
  assignFormulaCode,
  validateCouponCode,
  orderUpdate
} = orderProvider;

const {
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
  setMaxAssignedOrders
} = adminProvider;

const { getColorCode } = combinationProvider;

export const ORDER_UPDATED = "ORDER_UPDATED";

const Resolvers = {
  Mutation: {
    getLoginSuperAdmin: (_, params, context) =>
      authSuperAdmin(_, params, context),
    createProduct: (_, params, context) => addProduct(_, params, context),
    register: (_, params, context) => addUser(_, params, context),
    auth: (_, params, context) => loginUser(_, params, context),
    getLoginTabletAdmin: (_, params, context) => adminLogin(_, params, context),
    createOrder: (_, params, context) => addOrder(_, params, context),
    createAdmin: (_, params, context) => addAdmin(_, params, context),
    createFormula: (_, params, context) => createNewFormula(_, params, context),
    uploadFormulas: (_, params, context) => uploadFormulas(_, params, context),
    adminForgetPassword:  (_, params, context) => adminForgetPassword(_, params, context),
    updateAdminStatus: (_, params, context) =>
      updateAdminStatus(_, params, context),
    updateAdmin: (_, params, context) =>
      updateAdminPermission(_, params, context),
    saveAdmin: (_, params, context) => updateAdmin(_, params, context),
    assignMe: (_, params, context) => {
      return assignAdminSelf(_, params, context);
    },
    changeAdminStatus: (_, params, context) => adminStatus(_, params, context),
    assignOrderToAdmin: (_, params, context) => {
      return assignToAdmin(_, params, context);
    },

    assignProduct: (_, params, context) => {
      return productAssign(_, params, context);
    },
    deleteAdmins: (_, params, context) => delAdmins(_, params, context),
    updateUser: (_, params, context) => userUpdate(_, params, context),
    authenticateSocialUser: (_, params, context) => socialAuth(_, params, context),
    restPassword: (_, params, context) => passwordReset(_, params, context),
    changePassword: (_, params, context) => passwordChanged(_, params, context),
    updateAppSettings: (_, params, context) => updateSettings(_, params, context),
    sendSupportMessage: (_, params, context) => sendMessage(_, params, context),
    deleteSupportMessage: (_, params, context) => deleteMessage(_, params, context),
    addLayoutOne: (_, params, context) => addLayoutOne(_, params, context),
    updateLayoutOne: (_, params, context) => updateLayoutOne(_, params, context),
    addLayoutTwo: (_, params, context) => addLayoutTwo(_, params, context),
    updateLayoutTwo: (_, params, context) => updateLayoutTwo(_, params, context),
    updateLayoutThree: (_, params, context) => updateLayoutThree(_, params, context),
    assignFormulaCode: (_, params, context) => assignFormulaCode(_, params, context),
    changeOrderStatus: (_, params, context) => changeOrderStatus(_, params, context),
    updateOrderAssigner: (_, params, context) => updateOrderAssigner(_, params, context),
    validateCouponCode: (_, params, context) => validateCouponCode(_, params, context),
    orderUpdate: (_, params, context) => orderUpdate(_, params, context),
    setMaxAssignedOrders: (_, params, context) => setMaxAssignedOrders(_, params, context)
  },
  Query: {
    allProducts: (_, params, context) => getProducts(_, params, context),
    allFormulas: (_, params, context) => getAllFormulas(_, params, context),
    getListPlans:(_, params, context) => getListPlans(_, params, context),
    getStorageFolders:(_, params, context) => getStorageFolders(_, params, context),

    getFilesInFolder:(_, params, context) => getFilesInFolder(_, params, context),
    allOrders: (_, params, context) => getOrders(_, params, context),
    fetchOrders: (_, params, context) => fetchOrders(_, params, context),
    allAdmins: (_, params, context) => getAdmins(_, params, context),
    userOrder: (_, params, context) => userOrders(_, params, context),
    getOrderShadeCode: (_, params, context) =>
      getOrderShadeCode(_, params, context),
    appSettings: (_, params, context) => getAppSettings(_, params, context),
    supportMessages: (_, params, context) => getMessages(_, params, context),
    getLayoutOne: (_, params, context) => getLayoutOne(_, params, context),
    getLayoutTwo: (_, params, context) => getLayoutTwo(_, params, context),
    getLayoutThree: (_, params, context) => getLayoutThree(_, params, context),
    getColorCode: (_, params, context) => getColorCode(_, params, context),
    getCurrentUser:(_, params, context) => getCurrentUser(_, params, context),
    getAdminStatus: (_, params, context) => getAdminStatus(_, params, context),
    getCurrentAdminUser:(_, params, context) => getCurrentAdminUser(_, params, context),
    fetchCustomers: (_, params, context) => fetchCustomers(_, params, context),
  },
  Subscription: {
    order: {
      subscribe: () => {
        return pubsub.asyncIterator([ORDER_UPDATED]);
      },
    },
  },
  ObjectId: IdScalers,
  Date: dateScalar,
};

export default Resolvers;
