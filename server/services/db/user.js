const { Op } = require('sequelize');
const { hashingPw } = require('../../utils/bcrypt');
const { User } = require('../../models');

exports.selectUserFromPassport = async (id) => {
  const results = await User.findOne({
    attributes: ['no', 'id', 'name', 'password'],
    where: { id },
    raw: true,
  });

  return results;
};

exports.insertUser = async ({id, name, password }) => {
  const userData = {
    id,
    name,
    password: await hashingPw(password),
  };

  const results = await User.create(userData);
  return results;
};