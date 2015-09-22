module.exports = function(sequelize, DataTypes) {

  var CardType = sequelize.define("CardType", {
    cardTypeId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    cardTypeLabel: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    createdAt: false,
    updatedAt: false,
    deletedAt: false
  });

  return CardType;
};