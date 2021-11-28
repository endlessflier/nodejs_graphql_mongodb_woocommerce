const settingType = `
type faqType{
    title:String!
    description:String!
    image:String!
}
type settingType{
    privacy:String!
    terms:String!
    faqs:[faqType]
    howitworks: String!
    aboutUs: String!
    shippingPolicy: String!
    createdAt:String
}
input faqInput {
    title:String!
    description:String!
    image:String!
}
input settingInput{
    privacy:String!
    terms:String!
    howitworks: String!
    aboutUs: String!
    shippingPolicy: String!
    faqs:[faqInput]
}
`;

export default settingType;
