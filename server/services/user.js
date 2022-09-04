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

// 사용자 경험치 증가
exports.updateExperience = async (data) => {
  const result = await db.updateExperience(data);
  return result;
};

// 사용자 경험치 감소
exports.declineExperience = async (data) => {
  console.log(data);
  const result = await db.declineExperience(data);
  return result;
};

// 사용자 rank 확인
exports.getRank = async (data) => {
  console.log(data);
  const result = await db.getRank(data);
  return result;
};

// 사용자 마일리지 증가
exports.updateMiles = async () => {
  const result = await db.updateMiles();
  return result;
};

// 사용자 마일리지 감소
exports.declineMiles = async (data) => {
  console.log(data);
  // conditon setting
  const user_miles = await db.getUserMilse(data);
  console.log(user_miles.miles);
  if (data.miles.miles > user_miles.miles) {
    return "fail";
  } else {
    await db.declineMiles(data);
    return "success";
  }
};
