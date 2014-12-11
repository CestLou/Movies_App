"use strict";

module.exports = function(sequelize, DataTypes) {
  var newcomment = sequelize.define("newcomment", {
    comment: DataTypes.STRING,
    watchlistId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.newcomment.belongsTo(models.watchlist)
       }
    }
  });

  return newcomment;
};
