const { RESTDataSource } = require("apollo-datasource-rest");

module.exports = class Payroll extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:4000/";
  }
  async getAllEmployee() {
    const data = await this.get("employee");
    // return { emp_id: 1 };
    console.log(data);
    return data;
  }
  async createEmployee(Data) {
    console.log(Data);
    const data = await this.post("/employee", Data);

    // return { emp_id: 1 };
    console.log(data.imp_id);
    return data;
  }
};
