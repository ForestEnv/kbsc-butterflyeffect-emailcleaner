//const { Email } = require("../../models");
const { Delete } = require("../../models");

exports.setDeleteEmails = async (Emails) => {
  await Delete.bulkCreate(Emails);
};

exports.getDeleteEmails = async (user_no) => {
  const result = await Delete.findAll({ where: { user_no }, raw: true });
  return result;
};

exports.removeDeleteEmails = async ({ email_no, list }) => {
  const emailList = await Delete.findAll({
    where: { email_no: email_no, no: list },
    raw: true,
  });
  const emailLen = await Delete.destroy({
    where: { email_no: email_no, no: list },
  });
  return { emailList, emailLen };
};
