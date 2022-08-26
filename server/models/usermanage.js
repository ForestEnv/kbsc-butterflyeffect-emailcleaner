module.exports = (sequelize, DataTypes) => {
    return sequelize.define('usermanage', {//회원관리
        no: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
         },
        email_id: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        experience: {//경험치
            type: DataTyxpes.STRING(100),
            allowNull: false,
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