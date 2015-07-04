var sequelizeConnection = require("../technical/database/DataBaseConnection.js").sequelizeConnection;

var models = [
  'User'
]

models.forEach(function(model){
  module.exports[model] = sequelizeConnection.import(__dirname + '/' + model);
});
