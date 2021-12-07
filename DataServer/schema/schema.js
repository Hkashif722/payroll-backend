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
  type Department {
    dept_id: Int
    dept_name: String
  }
  type Grade {
    grade_id: Int
    grade_name: String
    grade_basic_salary: Int
    grade_bonus: Int
  }

  type Employee_Grade {
    transaction_id: Int
    emp_id: Int
    emp_dept_id: Int
    emp_grade_id: Int
    emp_from_date: String
    emp_to_date: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    employee: [Employee]
    department: [Department]
    grade: [Grade]
    employee_Grade: [Employee_Grade]
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
    addDepartment(dept_id: Int, dept_name: String): Department
    deleteDepartment(dept_id: Int): Department
    addGrade(
      grade_id: Int
      grade_name: String
      grade_basic_salary: Int
      grade_bonus: Int
    ): Grade
    addEmpGrade(
      transaction_id: Int
      emp_id: Int
      emp_dept_id: Int
      emp_grade_id: Int
      emp_from_date: String
      emp_to_date: String
    ): Employee_Grade
  }
`;
