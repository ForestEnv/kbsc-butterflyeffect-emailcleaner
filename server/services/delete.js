const db = require("./db/delete");

exports.setDeleteEmails = async (data) => {
  const result = await db.setDeleteEmails(data);
  return result;
};

exports.getDeleteEmails = async (data) => {
  const result = await db.getDeleteEmails(data);
  return result;
};

exports.removeDeleteEmails = async (data) => {
  const result = await db.removeDeleteEmails(data);
  return result;
};
