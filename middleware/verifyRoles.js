const ROLES_LIST = require("../config/roles_list");

const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles)
      return res.status(401).json({ message: "Unauthorized - No roles found" });

    // Convert role numbers to role names for comparison
    const roleNames = Object.keys(ROLES_LIST);
    const allowedRoleNames = allowedRoles
      .map((roleNum) => {
        return roleNames.find((name) => ROLES_LIST[name] === roleNum);
      })
      .filter(Boolean);

    // Check if user has any of the allowed roles
    const userRoles = Array.isArray(req.roles) ? req.roles : [req.roles];
    const hasRole = userRoles.some((role) => allowedRoleNames.includes(role));

    if (!hasRole) {
      return res
        .status(403)
        .json({ message: "Forbidden - Insufficient permissions" });
    }
    next();
  };
};

module.exports = verifyRoles;
