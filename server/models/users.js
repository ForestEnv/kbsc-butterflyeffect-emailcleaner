module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users', {
        user_no: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
        },
    
        id: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
           
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        
    }, 
    {
      timestamps: false,
    });
  };