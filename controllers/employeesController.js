// const data = {};
// data.employees = require("../modal/employees.json");

const data = {
  employees: require("../modal/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const addEmployee = (req, res) => {
  const addNewEmployee = {
    id: data.employees[data.employees.length - 1].id - 1 || 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  if (!addNewEmployee.firstname || !addNewEmployee.lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required" });
  }
  data.setEmployees([...data.employees, addNewEmployee]);
  res.status(201).json(data.employees);
};

const udpateEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );

  if (!employee) {
    return res.status(400).json({ message: "Employee Not found" });
  }

  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;

  res.json({ message: "User Updated Successfully" });
};

const deleteEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );

  if (!employee) res.status(400).json({ message: "No Employee Found" });
  const filtedEmployees = data.employees.filter(
    (emp) => emp.id === parseInt(req.body.id)
  );

  data.setEmployees([...filtedEmployees]);

  res.json({ id: req.body.id });
};

const getEmployee = (req, res) => {
  res.json({ id: req.params.id });
};

module.exports = {
  getAllEmployees,
  deleteEmployee,
  udpateEmployee,
  addEmployee,
  getEmployee,
};
