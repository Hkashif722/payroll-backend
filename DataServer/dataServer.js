const { ApolloServer } = require("apollo-server");
const Payroll = require("./database");
const typeDefs = require("./schema/schema");

const books = [
  {
    title: "The Awaken",
    author: "Kate Chopin",
    aa: "sdsd",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
    aa: "sdsd",
  },
];

const resolvers = {
  Query: {
    books: () => {
      console.log(books);
      return books;
    },
    employee: (_, __, { dataSources }) => dataSources.payroll.getAllEmployee(),
  },
  Mutation: {
    addEmployee: async (_, payload, { dataSources }) => {
      const employee = await dataSources.payroll.createEmployee(payload);

      return employee;
    },
  },
};

const url = "http://localhost:4000/";

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    payroll: new Payroll(),
  }),
});

// The `listen` method launches a web server.
server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
