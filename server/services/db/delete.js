//const { Email } = require("../../models");
const { Delete } = require("../../models");

exports.setDeleteEmails = async (Emails) => {
  console.log("************11");
  console.log(Emails);
  console.log("************22");
  await Delete.bulkCreate(Emails);
  console.log("************33");
}

exports.removeDeleteEmails = async ({email_no,list}) => {
  console.log("************11");
  await Delete.destroy({where:{email_no: email_no , no: list}});
  console.log("************22");
}