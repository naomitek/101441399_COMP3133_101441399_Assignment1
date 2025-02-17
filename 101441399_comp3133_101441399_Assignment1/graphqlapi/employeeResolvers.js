const Employee = require("../models/Employee");

const employeeResolvers = {
  Query: {
    getAllEmployees: async () => await Employee.find(),
    getEmployeeById: async (_, { id }) => await Employee.findById(id),
    searchEmployee: async (_, { designation, department }) => {
      let filter = {};
      if (designation) filter.designation = designation;
      if (department) filter.department = department;
      return await Employee.find(filter);
    },
  },
  Mutation: {
    addEmployee: async (_, args) => {
      const employee = new Employee(args);
      return await employee.save();
    },
    updateEmployee: async (_, { id, ...args }) => {
      return await Employee.findByIdAndUpdate(id, args, { new: true });
    },
    deleteEmployee: async (_, { id }) => {
      await Employee.findByIdAndDelete(id);
      return "Employee deleted successfully";
    },
  },
};

module.exports = employeeResolvers;
