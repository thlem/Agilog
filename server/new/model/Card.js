module.exports = function(sequelize, DataTypes) {

  var Card = sequelize.define("Card", {
    cardId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    cardTitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cardDescription: {
      type: DataTypes.STRING,
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
        Card.belongsTo(models.Backlog, {onDelete: "CASCADE", foreignKey: {name: 'backlogId'}});
        Card.belongsTo(models.Sprint, {onDelete: "CASCADE", foreignKey: {name: 'sprintId'}});
        Card.belongsTo(models.CardType, {onDelete: "CASCADE", foreignKey: {name: 'cardTypeId'}});
        Card.belongsTo(models.CardState, {onDelete: "CASCADE", foreignKey: {name: 'cardStateId'}});
      }
    }
  });

  return Card;
};