// email id pw 저장
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "email",
    {
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
      email_Pw: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      total_no: {
        //삭제된 메일수
        type: DataTypes.BIGINT,
        defaultValue: 0,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
