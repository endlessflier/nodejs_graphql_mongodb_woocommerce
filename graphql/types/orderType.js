const OrderType = `
  type orderType {
    user_id: userType
    address_id: addressType
    thumbs:[String]
    product:String
    assigner:adminType
    createdAt:String 

  }
  input orderFields{
    address1:String!
    address2:String!
    city:String!
    company:String!
    country:String
    phone:String!
    zip_code:String!
    country_code:String
    state: String
    first_name:String!
    last_name:String!
  }

  type orderResponse{
    correction: Boolean
    address_id:addressType
    assigner:adminType
    product:String
    thumbs:[String]
    shadeCodes:[String]
    subscriptionID: String
    planId: String
    user_id:userType,
    woocommerceOrderCreated: Boolean,
    createdAt:Date!
    _id:ObjectId!
    status:String
    formulaCode: String
    requiresInitialAssignment: Boolean
    customerUniqueCode: String
    assignmentCode: String
    woocommerceOrderId: String
  }

  input permissions {
    superAdmin: [String],
    tabletAdmin: [String],
  }
`;

export default OrderType;
