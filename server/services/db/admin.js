const { Op } = require("sequelize");
const { hashingPw } = require("../../utils/bcrypt");
const { Admin } = require("../../models");

exports.insertadmin = async ({ id, name, password }) => {
  const adminData = {
    id,
    name,
    password: await hashingPw(password),
  };

  const result = await Admin.create(adminData);

  return result;
};
