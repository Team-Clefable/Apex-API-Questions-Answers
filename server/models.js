const db = require('./db');

//create new date and set to unix timestamp
const date = Math.round(new Date().getTime()/1000);

module.exports = {


  queryAllQuestions: (req, res) => {
    let { id, page = 1, count =  5 } = req.params;
    // console.log(req.params);
    db.queryAllQuestions(id, page, count, (err, results) => {
      // console.log(err);
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(results.rows[0]);
      }
    });
  },


  //CURRENTLY WORKING ON//
  queryAllAnswers: (req, res) => {
    let { id, page = 1, count = 5 } = req.params;
    db.queryAllAnswers(id, page, count, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        let response = {
          question: id,
          page: page,
          count: count,
          results: results.rows[0].results
        }
        res.status(200).send(response);
      }
    });
  },
////////////////



  addQuestion: (req, res) => {
    let { id } = req.params;
    db.addQuestion(id, date, req.body, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(results.rows[0]);
      }
    });
  },

  addAnswer: (req, res) => {
    let { id } = req.params;
    db.addAnswer(id, date, req.body, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(results)
      }
    });
  },




  updateQuestionHelpful: (req, res) => {
    // console.log(req.params);
    let { id } = req.params;
    db.updateQuestionHelpful(id, (err, results) => {
      // console.log('this is results:', results);
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(results);
      }
    })
  },

  updateQuestionReport: (req, res) => {
    let { id } = req.params;
    db.updateQuestionReport(id, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(results);
      }
    })
  },

  updateAnswerHelpful: (req, res) => {
    // console.log('this is answer req.params:', req.params);
    let { id } = req.params;
    db.updateQuestionHelpful(id, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(results);
      }
    })
  },

  updateAnswerReport: (req, res) => {
    let { id } = req.params;
    db.updateAnswerReport(id, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(results);
      }
    })
  },




}