import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Character {
    id: Int!
    name: String!
    status: String!
    species: String!
    gender: String!
    origin: String!
    image: String
  }

  type Query {
    characters(
      status: String
      species: String
      gender: String
      name: String
      origin: String
    ): [Character]
  }
`);

export default schema;
