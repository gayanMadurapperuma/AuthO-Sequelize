const router = require('express').Router();
const db = require('../models');
const {authenticate} = require('../controller/middleware');

router.post('/user', (req,res) => {
    db.User.create(req.body).then(user => {
        if (!user)
            return Promise.reject;
        return res.send(user);
    }).catch(e => {
        return res.status(400).send();
    })
});

router.post('/login', (req,res) => {
    db.User.findOne({where : {
        username : req.body.username, password : req.body.password}
        }).then(vlidUser => {
            if (!vlidUser)
                return Promise.reject('Username or passwrod incorrect');
            const token = vlidUser.GenerateAuthToken();
            db.UserAuthorization.create({
                userId : vlidUser.id,
                access : 'auth',
                token : token
            }).then(Authtoken => {
                if (!Authtoken)
                    return Promise.reject();
                return res.header('x-auth', Authtoken.token).send(vlidUser);
            })
    }).catch(e => {
        return res.status(400).send(e);
    })
});

router.get('/users', authenticate ,(req,res) => {
    // const token = req.header('x-auth');
    // db.User.findByAuth(token, db).then(uesr => {
    //     if(!uesr)
    //         return Promise.reject();
    //     return res.send(uesr);
    // }).catch(e => {
    //     return res.status(404).send();
    // })
    res.send(req.user);
    
});


module.exports = {router};