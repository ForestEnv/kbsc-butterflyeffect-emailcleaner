module.exports = (sequelize, DataTypes) => {
    return sequelize.define('email', {//이메일 연동
            no: {
                autoIncrement: true,
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
             },
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