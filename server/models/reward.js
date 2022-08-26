module.exports = (sequelize, DataTypes) => {
    return sequelize.define('reward', {//리워드
             no: {
                autoIncrement: true,
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
             },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true,
            },
            
            miles: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },

        },
    {
      timestamps: false,
    });
  };