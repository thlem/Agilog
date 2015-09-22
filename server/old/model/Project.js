module.exports = function(sequelizeConnection, DataTypes) {
    var Project = sequelizeConnection.define("Project", {
        prjId: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        prjName: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    }, {
        createdAt: false,
        updatedAt: false,
        deletedAt: false
    });

    return Project;
}