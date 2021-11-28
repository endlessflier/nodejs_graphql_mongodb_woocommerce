const layoutOneType = `
type layoutDataType {
    id: String!
    description: String!
    image: String!
    disabled: Boolean!
}

type layoutOneType {
    layout: String!
    data: [layoutDataType]!
}

input layoutDataInput {
    id: String!
    description: String!
    image: String!
    disabled: Boolean!
}

input layoutOneInput {
    layout: String!
    data: [layoutDataInput]!
}
`;

export default layoutOneType;