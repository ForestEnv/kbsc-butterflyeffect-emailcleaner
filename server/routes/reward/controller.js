const { OK, CREATED, BAD_REQUEST } =
  require("../../config/statusCode").statusCode;

const userServices = require("../../services/user");
const emailServices = require("../../services/email");

exports.showRewardInfo = async (req, res, next) => {
  try {
    let user_no = req.params.user_no;
    const experience = await userServices.getUserExperience({ user_no });
    const miles = await userServices.getUserMiles({ user_no });
    res.status(CREATED).json({
      experience: experience.dataValues.experience,
      miles: miles.dataValues.miles,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: "확인 실패!",
    });
  }
};

exports.showMiles = async (req, res, next) => {
  try {
    let user_no = req.params.userNo;
    const miles = await userServices.getUserMiles({ user_no });
    res.status(CREATED).json({ miles: miles.dataValues.miles });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: "확인 실패!",
    });
  }
};

exports.showStatistics = async (req, res, next) => {
  try {
    let user_no = req.params.user_no;
    const count = await emailServices.getTotalNum(user_no);
    res.status(CREATED).json({ totalCount: count });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: "확인 실패!",
    });
  }
};

exports.showRank = async (req, res, next) => {
  try {
    let user_no = req.params.userNo;
    const rank = await userServices.getRank(user_no);
    res.status(CREATED).json({ rank });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: "확인 실패!",
    });
  }
};

exports.desclineUserMiles = async (req, res, next) => {
  try {
    let user_no = req.params.userNo;
    const miles = req.body;
    result = await userServices.declineMiles({ user_no, miles });
    res.status(CREATED).json({
      message: result,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: "update 실패!",
    });
  }
};
