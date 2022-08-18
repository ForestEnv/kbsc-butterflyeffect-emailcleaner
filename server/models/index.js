const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config2')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

//데이터베이스 모델 정의
db.User = require('./users')(sequelize, Sequelize);
db.Email = require('./email')(sequelize, Sequelize);

//데이터베이스 관계 정의
db.User.hasMany(db.Email, {foreignKey:'no'});
db.Email.belongsTo(db.User, {foreignKey:'user_no'});

/*db.User = require('./usermanage')(sequelize, Sequelize);
db.User = require('./email')(sequelize, Sequelize);
db.User = require('./delete')(sequelize, Sequelize);
db.User = require('./restore')(sequelize, Sequelize);
db.User = require('./challenge')(sequelize, Sequelize);
db.User = require('./treeplant')(sequelize, Sequelize);
db.User = require('./first_email')(sequelize, Sequelize);
db.User = require('./add_email')(sequelize, Sequelize);
db.User = require('./add2_email')(sequelize, Sequelize);
db.User = require('./reward')(sequelize, Sequelize);
*/

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;