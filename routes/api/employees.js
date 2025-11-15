const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController");
const verifyJWT = require("../../middleware/verifyJWT");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/roles_list");
router
  .route("/")
  .get(verifyJWT, employeesController.getAllEmployees)
  .post(
    verifyJWT,
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesController.addEmployee
  );

router
  .route("/:id")
  .get(verifyJWT, employeesController.getEmployee)
  .put(
    verifyJWT,
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesController.udpateEmployee
  )
  .delete(
    verifyJWT,
    verifyRoles(ROLES_LIST.Admin),
    employeesController.deleteEmployee
  );
module.exports = router;
