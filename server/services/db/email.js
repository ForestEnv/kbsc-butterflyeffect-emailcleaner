const { Email } = require("../../models");
const { hashingPw } = require("../../utils/bcrypt");

exports.insertEmail = async ({ no, email_id, email_Pw }) => {
  const emailData = {
    user_no: no,
    email_id,
    email_Pw: await hashingPw(email_Pw),
  };
  const result = await Email.create(emailData);
  return result;
};
