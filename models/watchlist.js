"use strict";

module.exports = function(sequelize, DataTypes) {
  var watchlist = sequelize.define("watchlist", {
    title: DataTypes.STRING,
    year: DataTypes.STRING,
    imdbcode: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.watchlist.hasMany(models.newcomment)
      }
    }
  });

  return watchlist;
};
