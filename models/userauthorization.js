'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserAuthorization = sequelize.define('UserAuthorization', {
    userId: DataTypes.INTEGER,
    access: DataTypes.STRING,
    token: DataTypes.STRING
  }, {});
  UserAuthorization.associate = function(models) {
    // associations can be defined here
    UserAuthorization.belongsTo(models.User,{foreignKey: 'userId'});
  };
  return UserAuthorization;
};