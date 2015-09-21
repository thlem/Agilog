module.exports = function(sequelize, DataTypes) {

  var Sprint = sequelize.define("Sprint", {
    sprintId: {
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
        Sprint.belongsTo(models.Project, {onDelete: "CASCADE", foreignKey: {name: 'projectId'}});
      }
    }
  });

  return Sprint;
};