const { Email } = require("../../models");
//const { Delete } = require("../../models");
const { hashingPw } = require("../../utils/bcrypt");

exports.insertEmail = async ({ no, email_id, email_Pw }) => {
  const emailData = {
    user_no: no,
    email_id,
    email_Pw,
  };
  const result = await Email.create(emailData);
  return result;
};

exports.getEmail = async ({ user_no }) => {
  const result = await Email.findAll({
    attributes: ["email_id", "email_Pw"],
    where: { user_no },
    raw: true,
  });
  return result;
};

exports.getEmailInfo = async ({ user_no, email_id }) => {
  const result = await Email.findOne({
    attributes: ["no", "email_Pw"],
    where: { user_no, email_id },
  });
  return result;
};

exports.updateTotalNum = async ({ email_no, emailLen }) => {
  const result = await Email.increment(
    { total_no: emailLen },
    { where: { no: email_no } }
  );
  return result;
};

exports.getTotalNum = async ({ user_no }) => {
  const result = await Email.sum("total_no", { where: { user_no } });
  return result;
};

exports.declineTotalNum = async ({ email_no, emailsLen }) => {
  const result = await Email.decrement(
    { total_no: emailsLen },
    { where: { no: email_no } }
  );
  return result;
};

exports.getEmailId = async (user_no) => {
  const result = await Email.findOne({
    attributes: ["email_id"],
    where: { user_no },
  });
  return result;
};
