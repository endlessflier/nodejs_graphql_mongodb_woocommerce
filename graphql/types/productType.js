const productType = `
type productType {
    name:String!
    price:String!
    image:String!
    createdAt:Date!
    _id:ObjectId!
}

type response {
    code: String
    success: Boolean
    message: String
    status: Int
    }

type statusResponse{
    code: String
    isOnline: Boolean
    success: Boolean
    message: String
    status: Int  
}
type colorCodeResponse {
        code: String
        success: Boolean
        message: String
        colorCode: String
        status: Int
        }
`;

export default productType;
