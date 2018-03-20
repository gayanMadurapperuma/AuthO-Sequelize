const db = require('../models');

var authenticate = (req,res,next) => {
    var token = req.header('x-auth');
    db.User.findByAuth(token, db).then(uesr => {
        if(!uesr)
            return Promise.reject();
        req.user = uesr;
        req.token = token;
        next();
    }).catch(e => {
        return res.status(401).send();
    })
};

module.exports = {authenticate};