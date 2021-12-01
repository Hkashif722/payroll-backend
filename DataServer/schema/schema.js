const { gql } = require("apollo-server");
module.exports = typeDefs = gql`
  type Book {
    title: String
    author: String
    aa: String
  }
  type Employee {
    emp_id: Int
    emp_name: String
    emp_dob: String
    emp_doj: String
    emp_city: String
    emp_pincode: String
    emp_mobile_no: Int
    emp_state: String
    emp_mail_id: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    employee: [Employee]
  }
  type Mutation {
    addEmployee(
      emp_id: Int
      emp_name: String
      emp_dob: String
      emp_doj: String
      emp_city: String
      emp_pincode: String
      emp_mobile_no: Int
      emp_state: String
      emp_mail_id: String
    ): Employee
  }
`;
