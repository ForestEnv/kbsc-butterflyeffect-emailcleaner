//const { Email } = require("../../models");
const { Delete } = require("../../models");

exports.setDeleteEmails = async (Emails) => {
  await Delete.bulkCreate(Emails);
};

exports.getDeleteEmails = async (user_no) => {
  console.log("**********1");
  const result = await Delete.findAll({ where: { user_no }, raw: true });
  console.log("**********2");
  return result;
};

exports.removeDeleteEmails = async ({ email_no, list }) => {
  console.log("************11");
  await Delete.destroy({ where: { email_no: email_no, no: list } });
  console.log("************22");
};
