'use strict';
const jwt = require('jsonwebtoken');
const fast = require('./userauthorization');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  User.findByAuth = function(token, models){
    User = this;
    var decode;
    try{
      decode = jwt.verify(token, 'testing123');
    }
    catch(e){
      return Promise.reject();
    }
    return models.UserAuthorization.findOne({
      where : {
        token : token,
        access : 'auth'
      },
      include : [{
        model: User,
        where :  {
          id : decode.id
        }
      }]
    })
  };
  User.prototype.GenerateAuthToken = function(){
    //return 'Get token instance method';
    const token = jwt.sign({id : this.id,username : this.username}, 'testing123');
    console.log('token ** ', token, ' =Id - ' + this.id);
    return token;
    // const Auth = models.UserAuthorization.build({
    //   userId : this.id,
    //   access : 'auth',
    //   token : token
    // });
    // console.log(Auth);
    // Auth.save().then(au => {
    //   if (!au)
    //     return Promise.reject('Something went wrong');
    //   console.log('Saved Auth **',au);
    //   return au;
    // }).catch(e => {
    //   return Promise.reject();
    // })
  }
  return User;
};

// models.UserAuthorization.create({
//   userId : this.id,
//   access : 'auth',
//   token : token
// }).then(authrizeToken => {
//   if(!authrizeToken)
//     return Promise.reject();
//   console.log('token save success ');
//   return token;
// }).catch(e => console.log(e));