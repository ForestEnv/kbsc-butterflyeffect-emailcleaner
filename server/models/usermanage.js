module.exports = (sequelize, DataTypes) => {
    return sequelize.define('usermanage', {

        id: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        ponit: {
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