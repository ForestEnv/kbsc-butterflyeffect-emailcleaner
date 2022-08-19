module.exports = (sequelize, DataTypes) => {
    return sequelize.define('email', {
            no: {
                autoIncrement: true,
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
            },
            user_no: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            email_password: {
                type: DataTypes.STRING(100),
                allowNull: false,
            }
        },
    {
        tableName: 'email',
        timestamps: true,
        paranoid: true,
        underscored: true,
    });
};