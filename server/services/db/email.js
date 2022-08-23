const { Email } = require("../../models");
//const { Delete } = require("../../models");
const { hashingPw } = require("../../utils/bcrypt");

exports.insertEmail = async ({ no, email_id, email_Pw }) => {
  console.log(no);
  console.log(email_id);
  console.log(email_Pw);
  const emailData = {
    user_no: no,
    email_id,
    email_Pw,
  };
  console.log(emailData);
  const result = await Email.create(emailData);
  console.log(result);
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
/*
exports.insertDeleteEmail = async ({ no, Emails }) => {
  console.log(Emails);
  const deleteData = {
    email_no: no,
    sender,
    date,
    title,
    delete_date, // 현재 시간
  };
  const result = await Delete.create(deleteData);
  return result;
};
*/
exports.updateTotalNum = async ({ email_no, emailLen }) => {
  const result = await Email.increment(
    { total_no: emailLen },
    { where: { no: email_no } }
  );
  return result;
};
