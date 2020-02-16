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

// ===========
// === GET ===
// ===========
app.get('/', function (req, res) {
  console.log('GET / OK');
  res.send("Petit curieux !");
});

app.get('/contrats', function (req, res) {
  let contrats = require('./contrats');
  console.log('GET /contrat OK');
  res.send(contrats);
});

// à enlever une fois en BD
app.get('/clauses', function (req, res) {
  let clauses = require('./clauses');
  console.log('GET /clauses OK');
  res.send(clauses);
});

app.get('/clauses/:id', function (req, res) {
  const moduleClauses = require('./clauses');
  let clauses = moduleClauses.clauses;
  var id = req.params.id;
  console.log('GET /clauses OK sur id ' + id);
  let clausesFiltrees = moduleClauses.getListeClauses(id);
  res.send(clausesFiltrees);
});

app.get('/shuttles', function (req, res) {
  let shuttles = require('./shuttles');
  console.log('GET /shuttles OK');
  res.send(shuttles);
});

app.get('/hotels', function (req, res) {
  let hotels = require('./hotels');
  console.log('GET /hotels OK');
  res.send(hotels);
});

// ============
// === POST ===
// ============
app.post('/shuttles', function(req, res) {
  console.log('post / OK : ' + req.body.name
  + '(' + req.body.type + ')');
  res.status(201).send(req.body);
});





app.listen(port, function () {
  console.log('App sur port ' + port);
});
