
const Mutations = `
  type Mutation {
    getLoginSuperAdmin(email:String!,password:String!):authResponse
    createProduct(name:String!,price:String!,image:String!):response
    createOrder(files:[String!],shadeCodes:[String!], subscriptionID:String!, planId: String!, shipping:orderFields! ):response
    createFormula(code: String!, baseType: String!, base: String!, red: String!, yellow: String!, white: String!, green: String!, black: String!):response
    uploadFormulas(formulas: String!) : response
    register(email:String!,image:String,name:String!,password:String!):userResponse
    auth(email:String!,password:String!):loginResponse
    createAdmin(email:String!,name:String!, adminLevels: [String]!, permissions: permissions!, id: String, isOnline: Boolean):response
    adminForgetPassword(email:String!): response
    updateAdmin(email:String!,name:String!, adminLevels: [String]!, permissions: permissions!):response
    saveAdmin(password:String!,token:String!):response
    assignMe(orderId:String!):response
    changeAdminStatus(adminIds:[String],status:String!):response
    assignOrderToAdmin(adminId:String,orderId:String):response
    deleteAdmins(adminIds:[String]):response
    updateUser(userData:userInput):updateProfileResponse
    assignProduct(orderId:String!,productOrder:String!, assignedImage: String):response
    authenticateSocialUser(email:String!,image:String!,name:String!,socialLoginId:String!,token:String):loginResponse
    restPassword(email:String!):resetResponse
    changePassword(confirmPassword:String!,password:String!,userId:String!):response
    updateAppSettings(data:settingInput):response
    getLoginTabletAdmin(email:String!,password:String!):adminLoginResponse
    sendSupportMessage(data: supportInput): response
    deleteSupportMessage(id: String!): response
    addLayoutOne(layout: String!, data: [layoutDataInput]!): response
    updateLayoutOne(layout: String!, data: [layoutDataInput]!): response
    addLayoutTwo(layout: String!, data: [layoutTwoDataInput]!): response
    updateLayoutTwo(layout: String!, data: [layoutTwoDataInput]!): response
    updateLayoutThree(id: String!, data: String!): response
    assignFormulaCode(id: String!, formulaCode: String!, printLabels: Boolean): response
    changeOrderStatus(id: String!, status: String!): response
    validateCouponCode(couponCode: String!) : response
    orderUpdate(update: String!, orderID: String!): response
    updateAdminStatus(isOnline: Boolean!):statusResponse
    updateOrderAssigner(orderID: String!):response
    setMaxAssignedOrders(count: Int!):response
  }
`;
  
export default Mutations;
