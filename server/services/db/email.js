const { Email } = require("../../models");
//const { Delete } = require("../../models");
const { hashingPw } = require("../../utils/bcrypt");

exports.insertEmail = async ({ no, email, emailPassword }) => {
  const emailData = {
    user_no: no,
    email_id: email,
    email_Pw: emailPassword,
  };
  console.log("PARMAS:"+emailData);
  const result = await Email.create(emailData);
  console.log("CREATE결과:"+result);
  return result;
};

exports.getEmail = async (no) => {
  const result = await Email.findAll({
    attributes: ["email_id", "email_Pw"],
    where: { no },
    raw: true,
  });
  console.log('사용자 이메일 디비:'+result.email_id);
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
