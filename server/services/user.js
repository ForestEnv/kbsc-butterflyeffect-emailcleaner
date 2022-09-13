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
  const rankList = await db.getRank(data);
  for (let index = 0; index < rankList.length; index++) {
    toatl_no = await db.getTotalNum(rankList[index]);
    rankList[index].dataValues.toatl_no = toatl_no;
    console.log(rankList[index]);
  }
  return rankList;
};

// 사용자 마일리지 증가
exports.updateMiles = async () => {
  const result = await db.updateMiles();
  return result;
};

// 사용자 마일리지 감소
exports.declineMiles = async (data) => {
  console.log(data.user_no);
  // conditon setting
  const user_miles = await db.getUserMiles(data);
  console.log(user_miles.miles);
  if (data.miles.miles > user_miles.miles) {
    return "fail";
  } else {
    await db.declineMiles(data);
    return "success";
  }
};

// 사용자 경험치 확인
exports.getUserExperience = async (data) => {
  const result = await db.getUserExperience(data);
  return result;
};

// 사용자 마일리지 확인
exports.getUserMiles = async (data) => {
  const result = await db.getUserMiles(data);
  return result;
};
