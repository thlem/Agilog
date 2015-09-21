module.exports = function(sequelize, DataTypes) {

  var User = sequelize.define("User", {
    userId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    userLogin: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    userPassword: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userFirstName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userLastName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userMail: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userToken: {
        type: DataTypes.STRING,
        allowNull: true
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
        User.belongsToMany(models.Project, {through: 'UserProjects', foreignKey: {name: 'projectId'}});
      }
    }
  });

  return User;
};