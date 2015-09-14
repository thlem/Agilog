var sequelize = require("sequelize"),
    dbConstant = require("./DbConstant.js");

var sequelizeConnection = new sequelize(dbConstant.dbName, dbConstant.dbUser, dbConstant.dbPassword, {
    host: dbConstant.dbHost,
    dialect: dbConstant.dbType,
    pool: {
        max: 100,
        min: 0,
        idle: 10000
    }
});

sequelizeConnection.authenticate().then(function() {
        console.log("CONNECTED! ");
    })
    .catch(function(err) {
        console.log("SOMETHING DONE GOOFED");
    })
    .done();

module.exports = {
    sequelizeConnection: sequelizeConnection,
    sequelize: sequelize
}