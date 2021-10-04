const fs = require('fs')
const path = require('path')
const https = require('https')
const axios = require('axios')
const ClientModel = require('../models/UsersModel');

module.exports = {
  get: async (req, res) => {
    var obj = req.body;
    ClientModel.getUsers(obj).then((data) => {
      res.json({ resp: { statusCode: 200 }, body: data })
    })

  },
}
