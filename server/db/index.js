require('dotenv').config();
const { Pool, Client } = require('pg');

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  database: process.env.DATABASE,
  port: process.env.PORT,
});


module.exports = {

  //need to redo and shape data accordingly
  queryAllQuestions: (productId, callback) => {
    let queryStr = `SELECT * FROM questions WHERE product_id = $1 ORDER BY question_helpfulness DESC`;
    // console.log('this is productId:', productId);
    pool.query(queryStr, [productId], (err, res) => {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  },

  // queryAllAnswers: (questionId, callback) => {
  //   let queryStr = `SELECT * FROM questions WHERE product_id = $1 ORDER BY question_helpfulness DESC`;
  //   pool.query(queryStr, (err, results) => {
  //     if (err) {
  //       callback(err);
  //     } else {
  //       callback(null, results);
  //     }
  //   });
  // },


  updateQuestionHelpful: (questionId, callback) => {
    let queryStr = `UPDATE questions SET question_helpfulness = question_helpfulness + 1 WHERE id = $1`;
    pool.query(queryStr, [questionId], (err, res) => {
      console.log('this is res:', res);
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  },

  updateQuestionReport: (questionId, callback) => {
    let queryStr = `UPDATE questions SET reported = true WHERE id = $1`;
    pool.query(queryStr, [questionId], (err, res) => {
      console.log(err);
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  },

  updateAnswerHelpful: (answerId, callback) => {
    let queryStr = `UPDATE answers SET helpfulness = helpfulness + 1 WHERE id = $1`;
    pool.query(queryStr, [answerId], (err, res) => {
      // console.log('this is res:', res);
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  },

  // updateAnswerReport: (answerId, callback) => {
  //   let queryStr = `UPDATE answers SET reported = true WHERE id = $1`;
  //   pool.query(queryStr, [answerId], (err, res) => {
  //     console.log(err);
  //     if (err) {
  //       callback(err);
  //     } else {
  //       callback(null, res);
  //     }
  //   });
  // },






}