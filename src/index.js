
var express = require('express');
var app = express();
const consign = require('consign');
const bodyParser = require('body-parser');
var cors = require('cors');

 var serverPort = 3401;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

consign().include('src/routes').into(app);



app.listen(serverPort, function() {
  console.log('server up and running at %s port', serverPort);
});


