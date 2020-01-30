const express = require('express');
const app = express();
const port = 3000;
//var cors = require('cors');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var contrats = require('./contrats');

app.get('/', function (req, res) {
  console.log('get / OK');
  res.send("GET de base");
});

app.get('/contrats', function (req, res) {
  console.log('get /contrat OK');
  res.send(contrats);
});


app.listen(port, function () {
  console.log('App sur port ' + port);
});
