const { ApolloServer, gql } = require("apollo-server");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello(name: String): String
    ideas: [Idea!]!
  },
  type Idea {
    id: ID!
    title: String
    desc: String
    vote: Int
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: (root, args, context) => "Hello " + args.name,
    ideas: (_, args, context) => [
      {
        title: "titre 1",
        desc: "desc 1",
        vote: 3
      },
      {
        title: "title 2",
        desc: "desc 2",
        vote: 2
      }
    ]
  },
  Idea: {
    title: (root, args, context) => "Titre 1",
    desc: (root, args, context) => "Dat desc omg!",
    vote: (root, args, context) => 13
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
