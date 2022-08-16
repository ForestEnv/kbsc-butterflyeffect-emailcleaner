const { OK, CREATED, BAD_REQUEST } = require('../../config/statusCode').statusCode;

//email 연동 API
exports.connectionEmail = async (req, res, next) => {
    try {
        const conn = req.body;
        res.status(OK).json({
            message: '이메일 연동 성공!',
            user:{
                no: req.user.no,
                id: req.user.id,
                name: req.user.name,
                isConnectionEmail: true
            }
        })
    } catch(error) {
        res.status(BAD_REQUEST).json({
            message: '연동 실패'
        });
    }
};