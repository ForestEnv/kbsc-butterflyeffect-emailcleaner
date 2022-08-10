module.exports = (sequelize, DataTypes) => {
    return sequelize.define('email', {

            email: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            add_email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
            },
            add2_email: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
        },
    {
      timestamps: false,
    });
  };