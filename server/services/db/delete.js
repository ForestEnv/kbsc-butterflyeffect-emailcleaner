//const { Email } = require("../../models");
const { Delete } = require("../../models");

exports.setDeleteEmails = async (Emails) => {
  console.log("************11");
  console.log(Emails);
  console.log("************22");
  await Delete.bulkCreate(Emails);
  console.log("************33");
}
