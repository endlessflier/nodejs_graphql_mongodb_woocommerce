const adminType = `

scalar ObjectId
scalar Date

type adminType{
name:String!
email:String!
password:String!
isOnline: Boolean
status:String!
createdAt:Date!
_id:ObjectId!
permissions: adminPermissions!
adminLevels: [String]!
}

type adminLoginResponse{
    accessToken:String!
    message:String
    admin:adminType
    status: Int
}
`;

export default adminType;
