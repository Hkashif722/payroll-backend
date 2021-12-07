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

  async AllGrade() {
    const data = await this.get("grade");
    console.log(data);
    return data;
  }
  async createEmployee(Data) {
    console.log(Data);
    const data = await this.post("employee", Data);

    // return { emp_id: 1 };
    console.log(data.imp_id);
    return data;
  }
  async getAllDepartment() {
    const data = await this.get("department");
    // console.log(data);
    return data;
  }

  async addDepartment(Data) {
    const data = await this.post("department", Data);
    // console.log(data);
    return data;
  }
  async delDepartment(Data) {
    console.log(Data);
    const data = await this.post("deldepartment", Data);
    return data;
  }
  async addGrade(Data) {
    const data = await this.post("grade", Data);
    return data;
  }

  async AllEmpGrade() {
    const data = await this.get("empgrade");
    console.log(data);
    return data;
  }

  async addEmpGrade(Data) {
    const data = await this.post("empgrade", Data);
    return data;
  }
};
