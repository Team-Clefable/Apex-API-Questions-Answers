const db = require('./db');

module.exports = {


  queryAllQuestions: (req, res) => {
    let { id } = req.params;
    // console.log(req.params);
    db.queryAllQuestions(id, (err, results) => {
      console.log(err);
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  },

  updateQuestionHelpful: (req, res) => {
    console.log(req.params);
    let { id } = req.params;
    db.updateQuestionHelpful(id, (err, results) => {
      console.log('this is results:', results);
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
    console.log('this is answer req.params:', req.params);
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