//const { Email } = require("../../models");
const { Delete } = require("../../models");
//const { hashingPw } = require("../../utils/bcrypt");

exports.setDeleteEmails = async ({ Emails }) => {
  console.log("************");
  console.log(Emails);
  console.log("************");
  await Delete.bulkCreate(Emails).then(() => {
    console.log("************11");
    return "Delete.findAll()";
  });
  console.log("************11");
};
