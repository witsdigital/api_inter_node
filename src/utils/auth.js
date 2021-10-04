'use strict';
const jwt = require('jsonwebtoken');
require('dotenv/config');


module.exports = {
    generateToken: (data) =>{
        return jwt.sign(data, process.env.SALT_KEY);
    },
    decodeToken: (token) =>{
        return jwt.verify(token, process.env.SALT_KEY);
    },
    authorize2: function (req, res, next) {
        var obj = req.body;
        var token = obj.token;
        if(!token){
             res.status(200).json({
                mensagem: 'Acesso negado!',
                codigo: 1
            });
        } else {
            jwt.verify(token, process.env.SALT_KEY, function (error, decoded){
                if(error){
                    res.status(200).json({
                        mensagem: 'Acesso negado!',
                        codigo: 2
                    })
                } else {
                    next();
                }
            });
        }
    }
};
