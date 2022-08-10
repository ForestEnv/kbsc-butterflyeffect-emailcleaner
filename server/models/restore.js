module.exports = (sequelize, DataTypes) => {
    return sequelize.define('restore', {

        delete_no: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
        },
        sender: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        date: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        contents: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },
    {
      timestamps: false,
    });
  };