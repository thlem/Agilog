module.exports = function(sequelize, DataTypes) {

  var Backlog = sequelize.define("Backlog", {
    backlogId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    }
  },
  {
    createdAt: false,
    updatedAt: false,
    deletedAt: false
  },
  {
    classMethods: {
      associate: function(models) {
        Backlog.belongsTo(models.Project, {onDelete: "CASCADE", foreignKey: {name: 'projectId'}});
      }
    }
  });

  return Backlog;
};