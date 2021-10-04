const fs = require('fs')
const path = require('path')
const https = require('https')
const axios = require('axios')
// const format = require('date-fns')
const ClientModel = require('../models/UsersModel');
const boletoController = require('../controllers/boletoController');


module.exports = {
  CreateTransacion: async (req, res) => {
    var obj = req.body;
    await ClientModel.getUsersFilter(obj.filter).then(async (data) => {
      // console.log(data)
      var result = data;
      var resultado = [];
      for (var i = 0; i < result.length; i++) {
        result[i].vencimento = obj.info.vencimento;
        try {
          var boleto = await boletoController.gerarBoleto(result[i]);
        } catch (err) {
          console.log(err)
          return err
        }
        resultado.push(boleto)
      }
      console.log(resultado)
      res.json({ resp: { statusCode: 200 }, body: resultado })
    })
  },
  getBoletos: async (req, res) => {
    var obj = req.body;
    console.log('obj')

    try {
      var bb = await boletoController.getBoleto(obj);
      res.json({ resp: { statusCode: 200 }, body: bb })
    } catch (err) {

      res.json({ err: { statusCode: 500, msg: 'Falha ao recuperar boleto', error: err } })

    }

  },
  generateSinglePdf: async (req, res) => {
    var obj = req.body;
    try {
      bb = await boletoController.getBoletoPdf(obj);
      res.json({ resp: { statusCode: bb.cod, msg: bb.msg, data: bb.data } })
    } catch (err) {
      res.json({ resp: { statusCode: 500 }, body: err })
    }
  },
  updateBoleto: async (req, res) => {
    var obj = req.body;
    try {
      bb = await boletoController.updateBoleto(obj);
      res.json({ resp: { statusCode: bb.cod, msg: bb.msg, data: bb.data } })
    } catch (err) {
      res.json({ resp: { statusCode: 500 }, body: err })
    }
  },
  generatePdf: async (req, res) => {
    var obj = req.body;
    obj = obj.lote;
    console.log(obj)
    for (var i = 0; i < obj.length; i++) {
      var bb = await boletoController.getBoletoPdf(obj[i]);
    }
    res.json({ resp: { statusCode: 200 }, body: bb })
  },
  getAndGeneratePdf: async (req, res) => {
    var obj = req.body;
    var bb = await boletoController.getBoleto(obj);
    console.log(bb.content.length)
    var objArr = [];
    for (var i = 0; i < bb.content.length; i++) {

      objArr.push(
        {
          dataEmissao: bb.content[i].dataEmissao,
          cod_boleto: bb.content[i].nossoNumero,
          nomeSacado: bb.content[i].nomeSacado
        }
      )
    }

    console.log(objArr);

    for (var i = 0; i < objArr.length; i++) {
      try {
        var bb = await boletoController.getBoletoPdf(objArr[i]);
      } catch (err) {
        console.log(err)
        return err
      }
    }
    res.json({ resp: { statusCode: 200 }, body: bb })
  },

}
