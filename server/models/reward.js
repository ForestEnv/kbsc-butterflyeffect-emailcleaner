module.exports = (sequelize, DataTypes) => {
    return sequelize.define('reward', {

            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            
            miles: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },

            no_carbon: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
        },
    {
      timestamps: false,
    });
  };