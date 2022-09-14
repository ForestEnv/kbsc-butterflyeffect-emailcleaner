const db = require("./db/email");

exports.setEmail = async (data) => {
  const result = await db.insertEmail(data);
  return result;
};

exports.getEmail = async (data) => {
  const result = await db.getEmail(data);
  return result;
};

exports.getEmailInfo = async (data) => {
  const result = await db.getEmailInfo(data);
  return result;
};

exports.updateTotalNum = async (data) => {
  const result = await db.updateTotalNum(data);
  return result;
};

exports.getTotalNum = async (data) => {
  const result = await db.getTotalNum(data);
  return result;
};

exports.declineTotalNum = async (data) => {
  const result = await db.declineTotalNum(data);
  return result;
};

exports.getEmailId = async (data) => {
  const result = await db.getEmailId(data);
  return result;
};
