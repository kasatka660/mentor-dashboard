const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const MongoClient = require('mongodb').MongoClient

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({extended: true}));

let db;

MongoClient.connect('mongodb://game-admin:123qwe@ds253104.mlab.com:53104/game-db', (err, client) => {
  if (err) return console.log(err);
  db = client.db('game-db');
  app.listen(port, ()=> console.log(`listening on ${port}`));
})

app.post('/new-player', (req, res) => {
  db.collection('players').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.send('ok');
  })
});

app.get('/result', (req, res) => {
  db.collection('players').find().sort({_id:-1}).limit(5).toArray(function(err, results) {
  console.log(results);
  let result = JSON.stringify(results);
  res.send(result);
  })
});
