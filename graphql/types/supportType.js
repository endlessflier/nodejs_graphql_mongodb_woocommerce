const supportType = `
type supportType {
    name: String!
    email: String!
    message: String!
    createdAt: Date
    id: String
}

input supportInput {
    name: String!
    email: String!
    message: String!
    createdAt: Date
}
`;

export default supportType;