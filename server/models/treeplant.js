module.exports = (sequelize, DataTypes) => {
    return sequelize.define('treeplant', {

            tree_no: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            goods: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
            },
            price: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
        },
    {
      timestamps: false,
    });
  };