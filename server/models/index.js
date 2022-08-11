const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = require('./users')(sequelize, Sequelize);

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