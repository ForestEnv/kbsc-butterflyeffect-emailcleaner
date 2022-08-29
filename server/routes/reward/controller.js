const { OK, CREATED, BAD_REQUEST } =
  require("../../config/statusCode").statusCode;

const userServices = require("../../services/user");
const emailServices = require("../../services/email");

exports.showStatistics = async (req, res, next) => {
  try {
    let user_no = req.params.userNo;
    console.log(user_no);
    const count = await emailServices.getTotalNum(user_no);
    console.log(count);
    console.log(count.dataValues);
    res.status(CREATED).json({ totalCount: count });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: "확인 실패!",
    });
  }
};
