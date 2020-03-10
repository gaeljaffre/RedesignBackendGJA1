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

/*
app.get('/clauses/:id', function (req, res) {
  let id = req.params.id;
  console.log('GET /clauses OK sur id ' + id);

  dbClauses.once("value", function(snapshot) {
      data = snapshot;   // JSON format
      console.log("id : " + id)
      let clauses = accesBD.snapshotToArray(data, id);

      for(let clause of clauses) {
        console.log("clause = " + clause.ori + "-" + clause.des);
      }

      res.send(clauses);
    }
  );
});
*/

// tester avec ABC

app.get('/clauses/:id', function (req, res) {
  let id = Number(req.params.id);
  console.log('GET /clauses OK sur id ' + id);

  // Vérification du paramètre
  if(isNaN(id)) {
    console.log("invalid parameter");
    res.send([]);
  } else {

    // Lecture en BD + filtre
    dbClauses.orderByChild("idContrat").equalTo(id).once("value", function(snapshot) {
      data = snapshot;   // JSON format
      console.log("id : " + id)
      let clauses = accesBD.snapshotToArray(data, id);

      for(let clause of clauses) {
        console.log("clause = " + clause.ori + "-" + clause.des);
      }

      res.send(clauses);
    });
  }
});


  // **********  à finir *******************
  // + ajouter index sur idContrat

  // Lecture en one-shot

  app.get('/contrats2', function (req, res) {
  console.log('GET /contrats');
  console.log("ref() : " + dbContrats.toString());

  var contrats = [];
  let strId="3";
  // OK avec 6 mais pas avec "6"
  // conversion de id en nombre
  
  });
/*
  // Lecture des contrats
  dbContrats.orderByChild("id").equalTo(id).once("value", function(snapshot) {
      data = snapshot;   // JSON format
      let contrats = accesBD.snapshotToArray(data);

      for(let contrat of contrats) {
        console.log("contrat = " + contrat.name);
      }
      res.send(contrats);
    }
  );
});
*/


// ===========
// === GET ===
// ===========
app.get('/', function (req, res) {
  console.log('GET / OK');
  res.send("Petit curieux !");
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
  console.log("ref() : " + dbContrats.toString());

  var contrats = [];
  // Lecture des contrats
  dbContrats.once("value", function(snapshot) {
      data = snapshot;   // JSON format
      let contrats = accesBD.snapshotToArray(data);

      for(let contrat of contrats) {
        console.log("contrat = " + contrat.name);
      }
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




// ===========
// === OLD ===
// ===========
app.get('/contrats_old', function (req, res) {
  let contrats = require('./contrats_old');
  console.log('GET /contrat_old OK');
  res.send(contrats);
});

// à enlever une fois en BD
app.get('/clauses_old', function (req, res) {
  let clauses = require('./clauses_old');
  console.log('GET /clauses_old OK');
  res.send(clauses);
});

app.get('/clauses_old/:id', function (req, res) {
  const moduleClauses = require('./clauses');
  let clauses = moduleClauses.clauses;
  let id = req.params.id;
  console.log('GET /clauses_old OK sur id ' + id);
  let clausesFiltrees = moduleClauses.getListeClauses(id);
  res.send(clausesFiltrees);
});
