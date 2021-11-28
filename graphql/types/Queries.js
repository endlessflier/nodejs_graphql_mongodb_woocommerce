const Queries = `
  type Query {
    adminSuper(email: String!): authResponse
    allProducts(page:Int,rowsPerPage:Int):[productType]
    allOrders(page:Int,rowsPerPage:Int):[orderResponse]
    allFormulas(page:Int,rowsPerPage:Int):response
    fetchOrders(page:Int!,limit:Int!, query:String, select: String, sort: String): response
    fetchCustomers(page:Int!,limit:Int!, query:String, select: String, sort: String): response
    getOrderShadeCode:[orderResponse]
    allAdmins(page:Int,rowsPerPage:Int):[adminType]
    userOrder:[orderResponse]
    appSettings:settingType
    supportMessages: [supportType]
    getFormula(formulaBaseCode: String, formulaCode: String): formulaType
    getLayoutOne: [layoutOneType]
    getLayoutTwo: [layoutTwoType]
    getLayoutThree: layoutThreeType
    getColorCode(combinations: String!): colorCodeResponse
    getAdminStatus: statusResponse
    getListPlans: response
    getStorageFolders(max_results:Int!,next_cursor:String,folderPath:String!): response
    getFilesInFolder(max_results:Int!,next_cursor:String,folderPath:String!): response
    getCurrentUser: response
    getCurrentAdminUser: adminLoginResponse
  }
`;

export default Queries;
