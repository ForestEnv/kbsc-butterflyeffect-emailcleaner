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
      email_no: {
        type: DataTypes.BIGINT,
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
      /*
      contents: {
        type: DataTypes.STRING(100),
        allowNull: false,
      }, 
      */
      delete_date: {
        type: DataTypes.timestamps,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
