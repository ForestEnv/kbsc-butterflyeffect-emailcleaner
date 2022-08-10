module.exports = (sequelize, DataTypes) => {
    return sequelize.define('first_email', {

            email: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            delete_no: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            add_no: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            total_no: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
        },
    {
      timestamps: false,
    });
  };