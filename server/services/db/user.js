const { Op } = require("sequelize");
const { hashingPw } = require("../../utils/bcrypt");
const { User } = require("../../models");
const { Email } = require("../../models");

exports.selectUserFromPassport = async (id) => {
  const result = await User.findOne({
    attributes: ["no", "id", "name", "password"],
    where: { id },
    raw: true,
  });

  return result;
};

exports.insertUser = async ({ id, name, password }) => {
  const userData = {
    id,
    name,
    password: await hashingPw(password),
  };

  const result = await User.create(userData);

  return result;
};

exports.updateIsConnectionEmail = async (no) => {
  const result = await User.update(
    { is_connection_email: true },
    { where: { no: no } }
  );
  return result;
};

exports.selectIsConnectionEmail = async (no) => {
  const result = await User.findOne({
    attributes: ["is_connection_email"],
    where: { no },
    raw: true,
  });

  return result;
};

exports.updateExperience = async ({ user_no, userPoint }) => {
  const result = await User.increment(
    { experience: userPoint },
    { where: { no: user_no } }
  );
  return result;
};

exports.declineExperience = async ({ user_no, emailsLen }) => {
  const result = await User.decrement(
    { experience: emailsLen },
    { where: { no: user_no } }
  );
  return result;
};

exports.getRank = async ({ user_no }) => {
  const result = await User.findAll({
    attributes: ["no", "id", "name"],
    /**
    include: [
      {
        model: Email,
        attributes: [
          email_id,
          //[(sequelize.fn("SUM", Sequelize.col("total_no")), "totalNum")],
        ],
        where: {
          user_no,
        },
      },
    ],
     */
    order: [["experience", "DESC"]],
  });
  return result;
};

exports.getTotalNum = async ({ no }) => {
  const result = await Email.sum("total_no", { where: { user_no: no } });
  return result;
};

exports.updateMiles = async () => {
  console.log("*********0");
  const result_1 = await User.increment(
    { miles: 100 },
    { where: { experience: { [Op.and]: { [Op.lte]: 5, [Op.gte]: 0 } } } }
  );
  console.log("*********1");
  const result_2 = await User.increment(
    { miles: 200 },
    { where: { experience: { [Op.and]: { [Op.lte]: 20, [Op.gte]: 6 } } } }
  );
  console.log("*********2");
  return { result_1, result_2 };
};

// 사용자 마일리지 확인
exports.getUserMiles = async ({ user_no }) => {
  const result = await User.findOne({
    attributes: ["miles"],
    where: { no: user_no },
  });
  return result;
};
// 사용자 마일리지 감소
exports.declineMiles = async ({ user_no, miles }) => {
  const result = await User.decrement(
    { miles: miles.miles },
    { where: { no: user_no } }
  );
  return result;
};

// 사용자 경험치 확인
exports.getUserExperience = async ({ user_no }) => {
  const result = await User.findOne({
    attributes: ["experience"],
    where: { no: user_no },
  });
  return result;
};
