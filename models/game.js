'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    history: DataTypes.STRING,
    current: DataTypes.STRING,
    xIsNext: DataTypes.INTEGER,
    winner: DataTypes.STRING
  }, {});
  Game.associate = function(models) {
    // associations can be defined here
  };
  return Game;
};