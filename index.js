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
let dbShuttles = db.ref('/shuttles');

// ===========
// === GET ===
// ===========
app.get('/', function (req, res) {
  console.log('GET / OK');
  res.send("Petit curieux !");
});

app.get('/hotels', function (req, res) {
  let hotels = require('./hotels');
  console.log('GET /hotels OK');
  res.send(hotels);
});

/************/
/* Contrats */
/************/
app.get('/contrats', function (req, res) {
  console.log('GET /contrats');
  console.log("ref() : " + dbContrats.toString());

  let contrats = [];
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

/***********/
/* Clauses */
/***********/
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

/************/
/* Shuttles */
/************/
app.get('/shuttles', function (req, res) {
  console.log('GET /shuttles');
  //console.log("ref() : " + dbShuttles.toString());

  let shuttles = [];
  // Lecture des contrats
  dbShuttles.once("value", function(snapshot) {
      data = snapshot;   // JSON format
      let shuttles = accesBD.snapshotToArray(data);

/*      
      for(let shuttle of shuttles) {
        console.log("shuttle = " + shuttle.name);
      }
*/

      res.send(shuttles);
    }
  );
});


// ============
// === POST ===
// ============
app.post('/shuttles', function(req, res) {
  let shuttle = req.body;
  console.log('post /shuttles OK : ' + shuttle.name
  + ' (' + shuttle.type + ')');

  // insertion dans la BD
  dbShuttles.push(shuttle);

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
  const moduleClauses = require('./clauses_old');
  let clauses = moduleClauses.clauses;
  let id = req.params.id;
  console.log('GET /clauses_old OK sur id ' + id);
  let clausesFiltrees = moduleClauses.getListeClauses(id);
  res.send(clausesFiltrees);
});

app.get('/shuttles_old', function (req, res) {
  let shuttles = require('./shuttles_old');
  console.log('GET /shuttles_old OK');
  res.send(shuttles);
});
