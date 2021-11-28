const SuperAdminType = `
  type adminPermissions {
    superAdmin: [String],
    tabletAdmin: [String],
  }

  type superAdminType {
    id: ID!
    email: String!
    permissions: adminPermissions!
    adminLevels: [String]!
    _id:ObjectId!
    
  }

  type authResponse {
  code: String!
  success: Boolean!
  message: String!
  accessToken:String!
  admin: superAdminType
  }
`;

export default SuperAdminType;
