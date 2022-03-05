const express = require('express');
const path = require('path');
const morgan = require('morgan');
const db =  require('./db/index.js');
// const axios = require('axios');
require('dotenv').config();
const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/qa/questions/:id', (req, res) => {
  let { id } = req.params;
  console.log(req.params);
  db.queryAllQuestions(id, (err, results) => {
    console.log(err);
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
});

app.get('/qa/question/:id/answers', (req, res) => {/* run corresponding models query function*/});

//POST REQUESTS//
app.post('/qa/questions/:id', (req, res) => { /* run corresponding models query function*/});
app.post('/qa/questions/:id/answers', (req, res) => { /* run corresponding models query function*/});

//PUT REQUESTS//
app.put('/qa/questions/:id/helpful', (req, res) => {
  db.updateQuestionHelp()
});
app.put('/qa/questions/:id/report', (req, res) => { /* run corresponding models query function*/});
app.put('/qa/answers/:id/helpful', (req, res) => { /* run corresponding models query function*/});
app.put('/qa/answers/:id/report', (req, res) => { /* run corresponding models query function*/});




app.listen(port, () => {
  console.log(`App running on port ${port}`)
});