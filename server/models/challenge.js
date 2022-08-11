module.exports = (sequelize, DataTypes) => {
    return sequelize.define('challenge', {

            challenge_no: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            
            challenge: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
        },
    {
      timestamps: false,
    });
  };