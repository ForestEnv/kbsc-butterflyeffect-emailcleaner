const db = require("./db/delete");

exports.setDeleteEmails = async (data) => {
  console.log(data);
  const result = await db.setDeleteEmails(data);
  return result;
};

exports.removeDeleteEmails = async (data) => {
  console.log(data);
  const result = await db.removeDeleteEmails(data);
  return result;
};