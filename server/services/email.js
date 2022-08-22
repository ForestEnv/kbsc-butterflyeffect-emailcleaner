const db = require("./db/email");

exports.setEmail = async (data) => {
  const result = await db.insertEmail(data);
  return result;
};

exports.getEmail = async (data) => {
  console.log(data);
  const result = await db.getEmail(data);
  return result;
};

exports.getEmailPassword = async (data) => {
  console.log(data);
  const result = await db.getEmailPassword(data);
  return result;
};
/*
exports.setDeleteEmail = async (data) => {
  const result = await db.insertDeleteEmail(data);
  return result;
};

exports.updateTotalNum = async (data) => {
  const result = await db.updateTotalNum(data);
  return result;
};
*/
