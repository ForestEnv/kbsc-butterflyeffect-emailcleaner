module.exports = (sequelize, DataTypes) => {
    return sequelize.define('usermanage', {//회원관리
        no: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
         },
        id: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        experience: {//경험치
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        level: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        ranking: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },
    {
      timestamps: false,
    });
  };