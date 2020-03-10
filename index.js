const express = require('express');
const app = express();
const port = 3000;
const accesBD = require('./accesBD');
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

// **********************
// * Connexion Firebase *
// **********************
var firebase = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://testbd1-c5167.firebaseio.com"
});

// Collections dans la real-time DB
let db = firebase.database();
let dbContrats = db.ref('/contrats');
let dbClauses = db.ref('/clauses');


app.get('/clauses/:id', function (req, res) {
  let id = req.params.id;
  console.log('GET /clauses2 OK sur id ' + id);

  console.log("ref() : " + dbClauses.toString());

  // Lecture des contrats
  dbClauses.once("value", function(snapshot) {
      data = snapshot;   // JSON format
      console.log("id : " + id)
      let clauses = accesBD.snapshotToArray(data, id);

      for(let clause of clauses) {
        console.log("clause = " + clause.ori + "-" + clause.des);
      }
   
      //console.log(data);

      res.send(clauses);
    }
  );


  // **********  à finir *******************
  // + ajouter index sur idContrat

  // Lecture en one-shot
/*
  var clauses = [];
//  refObjet.once("value", function(snapshot) {
  dbClauses.orderByChild("idContrat").equalTo(id).once("value", function(snapshot) {
      data = snapshot;   // JSON format

      let clauses = accesBD.snapshotToArray(data);

      console.log("clauses : " + clauses);

      for(let clause of clauses) {
        console.log("clause " + clause.id + " = " + clause.ori
          + " - " + clause.des);
      }
   
      //console.log(data);

      res.send(clauses);
    }
  );
*/
});


// ===========
// === GET ===
// ===========
app.get('/', function (req, res) {
  console.log('GET / OK');
  res.send("Petit curieux !");
});

app.get('/contrats_old', function (req, res) {
  let contrats = require('./contrats');
  console.log('GET /contrat OK');
  res.send(contrats);
});

// à enlever une fois en BD
app.get('/clauses_old', function (req, res) {
  let clauses = require('./clauses');
  console.log('GET /clauses OK');
  res.send(clauses);
});

app.get('/clauses/:id', function (req, res) {
  const moduleClauses = require('./clauses');
  let clauses = moduleClauses.clauses;
  let id = req.params.id;
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

// En BD
app.get('/contrats', function (req, res) {
  console.log('GET /contrats');

  // Accès BD
  console.log("ref() : " + dbContrats.toString());

  var contrats = [];
  // Lecture des contrats
  dbContrats.once("value", function(snapshot) {
      data = snapshot;   // JSON format

      let contrats = accesBD.snapshotToArray(data);

      for(let contrat of contrats) {
        console.log("contrat = " + contrat.name);
      }
   
      //console.log(data);

      res.send(contrats);
    }
  );
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
