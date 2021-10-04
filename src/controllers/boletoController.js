const fs = require('fs')
const path = require('path')
const https = require('https')
const axios = require('axios')
const ClientModel = require('../models/UsersModel');
const { lastDayOfMonth, format, getMonth } = require('date-fns');
const today = new Date();
const formattedDate = format(today, 'yyyy-MM-dd');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = false
const cert = fs.readFileSync(path.join(__dirname, '../cert/inter.crt'), 'utf8')
const key = fs.readFileSync(path.join(__dirname, '../cert/inter.key'), 'utf8')
const passphrase = 'thiago3030';
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
  cert: cert,
  key: key,
  passphrase: passphrase
})
const instance = axios.create({ httpsAgent: httpsAgent });


module.exports = {
  gerarBoleto: async (objpay) => {
    try {
      return await instance.post('https://apis.bancointer.com.br/openbanking/v1/certificado/boletos', {
        "pagador": {
          "cnpjCpf": objpay.doc,
          "nome": objpay.name,
          "email": objpay.email,
          "telefone": objpay.telefone,
          "cep": objpay.cep,
          "numero": objpay.numero,
          "complemento": objpay.complemento,
          "bairro": objpay.bairro,
          "cidade": objpay.cidade,
          "uf": objpay.uf,
          "endereco": objpay.endereco,
          "ddd": objpay.ddd,
          "tipoPessoa": objpay.type_client
        },
        "dataEmissao": formattedDate,
        "seuNumero": objpay.id_client,
        "dataVencimento": objpay.vencimento,
        "mensagem": {
          "linha1": "mensagem na linha 1",
          "linha2": "mensagem na linha 2",
          "linha3": "mensagem na linha 3",
          "linha4": "mensagem na linha 4",
          "linha5": "mensagem na linha 5"
        },
        "desconto1": {
          "codigoDesconto": "NAOTEMDESCONTO",
          "taxa": 0,
          "valor": 0,
          "data": ""
        },
        "desconto2": {
          "codigoDesconto": "NAOTEMDESCONTO",
          "taxa": 0,
          "valor": 0,
          "data": ""
        },
        "desconto3": {
          "codigoDesconto": "NAOTEMDESCONTO",
          "taxa": 0,
          "valor": 0,
          "data": ""
        },
        "valorNominal": objpay.valor,
        "valorAbatimento": 0,
        "multa": {
          "codigoMulta": "NAOTEMMULTA",
          "valor": 0,
          "taxa": 0
        },
        "mora": {
          "codigoMora": "ISENTO",
          "valor": 0,
          "taxa": 0
        },
        "cnpjCPFBeneficiario": process.env.CNPJ_RECEBEDOR,
        "numDiasAgenda": "TRINTA"
      }, {
        headers: {
          "x-inter-conta-corrente": process.env.CONTACORRENTE
        }
      }).then(resultado => {
        return resultado.data
      })
    }
    catch (err) {
      console.log(err)
      return err
    }

  },
  getBoleto: async (objpay) => {
    console.log(objpay)

    try {

      return await instance.get('https://apis.bancointer.com.br/openbanking/v1/certificado/boletos',
        {
          params: objpay, 'headers': { 'x-inter-conta-corrente': process.env.CONTACORRENTE }
        }

      ).then(resultado => {
        return resultado.data
      })
    }
    catch (err) {
      console.log(err)
      return err
    }
  },
  updateBoleto: async (objpay) => {
    console.log(objpay)
    try {
      return await instance.get('https://apis.bancointer.com.br/openbanking/v1/certificado/boletos/' + objpay.cod_boleto + '/baixas',
        {
          'headers': { 'x-inter-conta-corrente': process.env.CONTACORRENTE }
        }

      )

    } catch (err) {
      return err
    }
  }


  ,
  updateBoleto: async (objpay) => {
    console.log(objpay)

    try {

      await instance.get('https://apis.bancointer.com.br/openbanking/v1/certificado/boletos/' + objpay.cod_boleto + '/baixas',
        {
          params: objpay.params, 'headers': { 'x-inter-conta-corrente': process.env.CONTACORRENTE }
        }
      ).then((data) => {
        return { msg: data.statusText, cod: data.status, data: null }
      })
      
    }
    catch (err) {
      console.log({ msg: err.response.statusText, cod: err.response.status })

      return { msg: err.response.statusText, cod: err.response.status, data: null }
    }
  },
  getBoletoPdf: async (objpay) => {
    console.log(objpay)

    try {

      return await instance.get('https://apis.bancointer.com.br/openbanking/v1/certificado/boletos/' + objpay.cod_boleto + '/pdf',
        {
          'headers': { 'x-inter-conta-corrente': process.env.CONTACORRENTE }
        }

      ).then(resultado => {

        var mounth = format(today, 'MM');
        var year = format(today, 'yyyy');
        var dirPath = 'boletos/' + year + '/' + mounth;
        var filename = objpay.nomeSacado + '.pdf';
        console.log(mounth)

        fs.access(dirPath, fs.constants.F_OK, (err) => {
          if (err) {
            // Create directory if directory does not exist.
            fs.mkdir(dirPath, { recursive: true }, (err) => {
              if (err) console.log(`Error creating directory: ${err}`)
              else console.log('Directory created successfully.')
              fs.writeFile(dirPath + '/' + filename, resultado.data, 'base64', (error) => {
                if (error) throw error;
                console.log("Doc saved!");
              });
            })
          } else {
            fs.writeFile(dirPath + '/' + filename, resultado.data, 'base64', (error) => {
              if (error) throw error;
              console.log("Doc saved!");
            });
          }
          // Directory now exists.
        })
        // fs.mkdir('my/new/folder/create', { recursive: true }, (err) => { if (err) throw err; });


        return { msg: resultado.statusText, cod: resultado.status, data: null }
      })
    }
    catch (err) {
      console.log({ msg: err.response.statusText, cod: err.response.status })

      return { msg: err.response.statusText, cod: err.response.status, data: null }
    }
  }

}
