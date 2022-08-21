const { Email } = require("../../models");
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
  console.log(result);
  return result;
};

exports.getEmailPassword = async ({ user_no, email_id }) => {
  console.log("fasfasd" + user_no);
  console.log(email_id);
  const result = await Email.findAll({
    attributes: ["email_Pw"],
    where: { user_no, email_id },
  });
  console.log("----------result----------");
  console.log(result);
  return result;
};
