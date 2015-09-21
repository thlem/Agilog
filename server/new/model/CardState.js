module.exports = function(sequelize, DataTypes) {

  var CardState = sequelize.define("CardState", {
    cardStateId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    cardStateLabel: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    createdAt: false,
    updatedAt: false,
    deletedAt: false
  });

  return CardState;
};