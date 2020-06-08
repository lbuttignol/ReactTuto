'use strict';
module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('Board', {
    0: DataTypes.STRING,
    1: DataTypes.STRING,
    2: DataTypes.STRING,
    3: DataTypes.STRING,
    4: DataTypes.STRING,
    5: DataTypes.STRING,
    6: DataTypes.STRING,
    7: DataTypes.STRING,
    8: DataTypes.STRING
  }, {});
  Board.associate = function(models) {
    // Belongs to a Game
    Board.belongsTo(models.Game);
  };
  return Board;
};