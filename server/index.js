const express = require('express');
const path = require('path');
const morgan = require('morgan');
const db =  require('./db/index.js');
require('dotenv').config();
const app = express();
const port = 3000;
const router = require('./router.js');

//attach middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/qa', router);
//
// app.get('/qa/questions/:id', (req, res) => {
//   let { id } = req.params;
//   // console.log(req.params);
//   db.queryAllQuestions(id, (err, results) => {
//     console.log(err);
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(200).send(results);
//     }
//   });
// });

// app.get('/qa/questions/:id/answers', (req, res) => {/* run corresponding models query function*/});

// //POST REQUESTS//
// app.post('/qa/questions/:id', (req, res) => { /* run corresponding models query function*/});
// app.post('/qa/questions/:id/answers', (req, res) => { /* run corresponding models query function*/});

// //PUT REQUESTS//
// app.put('/qa/questions/:id/helpful', (req, res) => {
//   console.log(req.params);
//   let { id } = req.params;
//   db.updateQuestionHelpful(id, (err, results) => {
//     console.log('this is results:', results);
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(200).send(results);
//     }
//   })
// });

// app.put('/qa/questions/:id/report', (req, res) => { /* run corresponding models query function*/});

// app.put('/qa/answers/:id/helpful', (req, res) => { /* run corresponding models query function*/});

// app.put('/qa/answers/:id/report', (req, res) => { /* run corresponding models query function*/});




app.listen(port, () => {
  console.log(`App running on port ${port}`)
});