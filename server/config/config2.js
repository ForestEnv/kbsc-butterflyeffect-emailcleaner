const {DEV_DB_USER, DEV_DB_PW, DEV_DB, DEV_DB_HOST, DEV_DB_DIALECT} = process.env;

module.exports = {
  development: {
    username: DEV_DB_USER,
    password: DEV_DB_PW,
    database: DEV_DB,
    host: DEV_DB_HOST,
    dialect: DEV_DB_DIALECT
  },
  test: {
    username: DEV_DB_USER,
    password: DEV_DB_PW,
    database: DEV_DB,
    host: DEV_DB_HOST,
    dialect: DEV_DB_DIALECT
  },
  production: {
    username: DEV_DB_USER,
    password: DEV_DB_PW,
    database: DEV_DB,
    host: DEV_DB_HOST,
    dialect: DEV_DB_DIALECT
  }
}