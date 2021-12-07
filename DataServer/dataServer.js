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
    department: (_, __, { dataSources }) =>
      dataSources.payroll.getAllDepartment(),
    grade: (_, __, { dataSources }) => dataSources.payroll.AllGrade(),
    employee_Grade: (_, __, { dataSources }) =>
      dataSources.payroll.AllEmpGrade(),
  },
  Mutation: {
    addEmployee: async (_, payload, { dataSources }) => {
      const employee = await dataSources.payroll.createEmployee(payload);
      // console.log(employee);
      return employee;
    },
    addDepartment: async (_, payload, { dataSources }) => {
      const department = await dataSources.payroll.addDepartment(payload);
      console.log("DD");
      // console.log(department);
      return department;
    },
    deleteDepartment: async (_, payload, { dataSources }) => {
      console.log(payload);
      const delDepartment = await dataSources.payroll.delDepartment(payload);
      // console.log(delDepartment);
      return delDepartment;
    },
    addGrade: async (_, payload, { dataSources }) => {
      const addGrade = await dataSources.payroll.addGrade(payload);
      return addGrade;
    },
    addEmpGrade: async (_, payload, { dataSources }) => {
      const addEmpGrade = await dataSources.payroll.addEmpGrade(payload);
      return addEmpGrade;
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
