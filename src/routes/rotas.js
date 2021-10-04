var controller = require('../controllers/UsersController');
var boletoController = require('../controllers/boletoController');
var transactionController = require('../controllers/transactionController');

module.exports = function (app) {
    app.post('/gerarBoleto', boletoController.gerarBoleto);
    app.get('/client/clients', controller.get);
    app.post('/transaction', transactionController.CreateTransacion);
    // app.post('/updateBoleto', transactionController.updateBoleto);
    app.get('/boletos/getAll', transactionController.getBoletos);
    app.get('/boletos/generateSinglePdf', transactionController.generateSinglePdf);
    app.get('/boletos/getPdf', transactionController.generatePdf);
    app.get('/boletos/getAndGenerate', transactionController.getAndGeneratePdf);
};
