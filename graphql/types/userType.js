const userType = `
type userType{
    _id:String
    name:String!
    gender:String!
    email:String!
    image:String
    socialLoginId:String!
    tokens:[String]
}

input userInput{
    name: String
    image: String
}


type userResponse{
    user:userType
    message:String
    status:Int
    accessToken:String
}

type resetResponse{
    userId:String
    message:String
    status:Int
    code:Int

}

type loginResponse{
    accessToken:String
    userId:String
    message:String
    user:userType
}

type updateProfileResponse{
    status:Int
    message:String
    user:userType
}

`;

export default userType;
