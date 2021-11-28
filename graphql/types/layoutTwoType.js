const layoutTwoType = `
type layoutTwoDataType {
    id: String!
    description: String!
    image: String!
    columnId: String!
}

type layoutTwoType {
    layout: String!
    data: [layoutTwoDataType]!
}

input layoutTwoDataInput {
    id: String!
    description: String!
    image: String!
    columnId: String!
}

input layoutTwoInput {
    layout: String!
    data: [layoutTwoDataInput]!
}
`;

export default layoutTwoType;