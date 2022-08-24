const db = require("./db/delete");

exports.setDeleteEmails = async (data) => {
  console.log(data);
  const result = await db.setDeleteEmails(data);
  return result;
};
