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


// Connexion Firebase

var firebase = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://testbd1-c5167.firebaseio.com"
});


/*
  var ref = firebase.database().ref('/contrats');
  var obj = {"id":1,"name":"TOTAL","description":"The most famous client","country":"XX","type":"Global market","gin":"180012345678","ddv":"01/01/2020","dfv":"31/12/2020"};
  ref.push(obj);
*/

/*
var ref = firebase.database().ref('/contrats');

var obj = {"id":2,"name":"BUTAGAZ","description":"The best case study for Catherine","country":"FR","type":"Standard","gin":"180000000001","ddv":"01/01/2020","dfv":"31/12/2020"};
ref.push(obj);
*/

//var db = firebase.database();

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};

app.get('/firebase', function (req, res) {
  console.log('GET /firebase');

  const refObjet = firebase.database().ref('/contrats');
  console.log("ref() : " + refObjet.toString());

  var data = [];
  refObjet.once("value", function(snapshot) {
    data = snapshot;   // JSON format

    let contrats = snapshotToArray(data);

    for(let contrat of contrats) {
      console.log("contrat = " + contrat.name);
    }
   
    //console.log(data);

    res.send(data);
    }
  );
  console.log("data = " + data);

});




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
