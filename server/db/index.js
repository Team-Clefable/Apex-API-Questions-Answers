require('dotenv').config();
const { Pool, Client } = require('pg');

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  database: process.env.DATABASE,
  port: process.env.PORT,
});

pool.on('connect', client => {
  console.log('pool is connected to database');
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

  addQuestion: (productId, date, { body, name, email }, callback) => {
    // console.log('this is body:', body);
    // console.log('this is date:', date);
    // console.log('this is name:', name);
    // console.log('this is email:', email);
    // console.log('this is reported:', reported);
    // console.log('this is question_helpfulness:', question_helpfulness);
    //if changes to default, can remove the values that are based on
    let queryStr = `INSERT INTO questions (product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    pool.query(queryStr, [productId, body, date, name, email, reported, question_helpfulness], (err, res) => {
      console.log('this is err:', err);
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  },




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

  updateAnswerReport: (answerId, callback) => {
    let queryStr = `UPDATE answers SET reported = true WHERE id = $1`;
    pool.query(queryStr, [answerId], (err, res) => {
      // console.log(err);
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  },






}