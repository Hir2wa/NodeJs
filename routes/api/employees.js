const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController");
const verifyJWT = require("../../middleware/verifyJWT");
router
  .route("/")
  .get(verifyJWT, employeesController.getAllEmployees)
  .post(employeesController.addEmployee);

router
  .route("/:id")
  .get(employeesController.getEmployee)
  .put(employeesController.udpateEmployee)
  .delete(employeesController.deleteEmployee);
module.exports = router;
