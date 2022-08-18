const { Op } = require('sequelize');
const { hashingPw } = require('../../utils/bcrypt');
const { User } = require('../../models');

exports.selectUserFromPassport = async (id) => {
  const result = await User.findOne({
    attributes: ['no', 'id', 'name', 'password'],
    where: { id },
    raw: true,
  });
  
  return result;
};

exports.insertUser = async ({id, name, password }) => {
  const userData = {
    id,
    name,
    password: await hashingPw(password),
  };

  const result = await User.create(userData);
  
  return result;
};

exports.selectIsConnectionEmail = async(no) => {
  console.log('사용자 번호 ='+no);
  const result = await User.findOne({
    attributes: ['is_connection_email'],
    where: { no },
    raw: true
  });

  return result;
}