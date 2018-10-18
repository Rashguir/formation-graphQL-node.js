const { ApolloServer, gql } = require("apollo-server");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello(name: String): String
    ideas(id: ID): [Idea!]!
  },
  type Idea {
    id: ID!
    title: String!
    desc: String
    vote: Int!
  }
  input IdeaInput {
    title: String!
    desc: String
  }
  type Mutation {
    upVote(id: ID!): Idea!
    insertIdea(input: IdeaInput!): Idea!
  }
`;

const ideas = [
  {
    id: 1,
    title: "titre 1",
    desc: "desc 1",
    vote: 3
  },
  {
    id: 2,
    title: "title 2",
    desc: "desc 2",
    vote: 2
  }
];

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: (root, args, context) => "Hello " + args.name,
    ideas: (_, args, context) => {
      if (args.id) {
        return ideas.filter(idea => idea.id === Number(args.id));
      }
      return ideas;
    }
  },
  Mutation: {
    upVote: (_, args, context) => {
      let idea = ideas.filter(idea => idea.id === Number(args.id))[0];
      // console.log(idea);
      if (!idea) {
        throw new Error("Idea not found!");
      }
      idea.vote += 1;

      return idea;

      // return {
      //   ...idea,
      //   vote: idea.vote + 1
      // };
    },
    insertIdea: (_, args, context) => {
      let ideaInput = args.input;

      console.log(ideaInput);
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
