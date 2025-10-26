const data = {};
data.employees = require("../modal/employees.json");

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const addEmployee = (req, res) => {
  res.json({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });
};

const udpateEmployee = (req, res) => {
  res.json({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });
};

const deleteEmployee = (req, res) => {
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
