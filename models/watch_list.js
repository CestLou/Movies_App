"use strict";

module.exports = function(sequelize, DataTypes) {
  var Watch_List = sequelize.define("Watch_List", {
    title: DataTypes.STRING,
    year: DataTypes.STRING,
    imdb_code: DataTypes.STRING,
    poster: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Watch_List;
};
