"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Watch_Lists", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: {
        type: DataTypes.STRING
      },
      year: {
        type: DataTypes.STRING
      },
      imdb_code: {
        type: DataTypes.STRING
      },
     poster: {
       type: DataTypes.STRING
     },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("Watch_Lists").done(done);
  }
};