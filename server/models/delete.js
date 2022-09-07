module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "delete",
    {
      no: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      user_no: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      email_id: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      sender: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      date: {
        //받은날짜
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      deleteDate: {
        // type: DataTypes.timestamps,
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
