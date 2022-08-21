const db = require("./db/user");

exports.setUser = async (data) => {
  const users = await db.insertUser(data);
  return users;
};

//이메일 연동 여부 확인 조회
exports.getIsConnectionEmail = async (data) => {
  const isConnectionEmail = await db.selectIsConnectionEmail(data);
  return isConnectionEmail;
};

exports.updateIsConnectionEmail = async (data) => {
  const result = await db.updateIsConnectionEmail(data);
  return result;
};
