module.exports = function(sequelizeConnection, DataTypes) {
    return sequelizeConnection.define("User", {
        usrId: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        usrLogin: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        usrPassword: {
            type: DataTypes.STRING,
            allowNull: false
        },
        usrFirstName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        usrLastName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        usrMail: {
            type: DataTypes.STRING,
            allowNull: true
        },
        token: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        createdAt: false,
        updatedAt: false,
        deletedAt: false
    });
}