module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "user",
    {
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
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      is_connection_email: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: false,
      },
      experience: {
        //경험치
        type: DataTypes.BIGINT,
        defaultValue: 0,
        allowNull: false,
      },
      miles: {
        // 나무사는 돈
        type: DataTypes.BIGINT,
        defaultValue: 0,
        allowNull: false,
      },
      auth: {
        // 관리자 권한여부
        // 0-> user
        // 1 -> 관리자
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: false,
      },
    },
    {
      tableName: "user",
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );
};
