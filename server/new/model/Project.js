module.exports = function(sequelize, DataTypes) {

  var Project = sequelize.define("Project", {
    projectId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    projectName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
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
        Project.belongsToMany(models.User, {through: 'UserProjects', foreignKey: {name: 'userId'}});
      }
    }
  });

  return Project;
};