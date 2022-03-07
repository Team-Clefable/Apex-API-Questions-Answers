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

// let queryStr = `SELECT * FROM questions WHERE product_id = $1 ORDER BY question_helpfulness DESC`;

//refactor by getting rid of models.js and sending back with .then/.catch blocks
module.exports = {

  //answers not sorted correct line 29 not firing for some reason
  //diary this stuff
  queryAllQuestions: (productId, callback) => {
    let queryStr = `SELECT product_id, json_agg(json_build_object(
      'question_id', id,
      'question_body', question_body,
      'question_date', question_date,
      'asker_name', asker_name,
      'question_helpfulness', question_helpfulness,
      'reported', reported,
      'answers', (SELECT coalesce(json_object_agg (answers.id, json_build_object (
        'id', id,
        'body', body,
        'date', date,
        'answerer_name', answerer_name,
        'helpfulness', helpfulness,
        'photos', (SELECT coalesce(json_agg (json_build_object (
          'id', answers_id,
          'url', url)
      ), '[]')
     FROM photos WHERE answers.id = answers_id)
     ) ORDER BY helpfulness DESC ), '{}')
     FROM answers WHERE questions.id = answers.question_id
     )
     ) ORDER BY question_helpfulness DESC)
     as results FROM questions WHERE product_id = $1 AND reported = false GROUP BY product_id `;
    // console.log('this is productId:', productId);
    pool.query(queryStr, [productId], (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },



  queryAllAnswers: (questionId, page, count, callback) => {
    let queryStr = `SELECT json_agg(json_build_object(
      'answer_id', id,
      'body', body,
      'date', date,
      'answerer_name', answerer_name,
      'helpfulness', helpfulness,
      'photos', (
        SELECT coalesce(json_agg(json_build_object(
          'id', id,
          'url', url
        )
        ), '{}') FROM photos p WHERE a.id = p.answers_id)
    ) ORDER BY helpfulness DESC) AS results FROM answers a WHERE question_id = $1 AND reported = false LIMIT ${count} OFFSET ${count * page - count}`;
    pool.query(queryStr, [questionId], (err, results) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },

  addQuestion: (productId, date, { body, name, email }, callback) => {
    // console.log('this is body:', body);
    // console.log('this is date:', date);
    // console.log('this is name:', name);
    // console.log('this is email:', email);
    // console.log('this is reported:', reported);
    // console.log('this is question_helpfulness:', question_helpfulness);
    //if changes to default, can remove the values that are based on
    let queryStr = `INSERT INTO questions (product_id, question_body, question_date, asker_name, asker_email) VALUES ($1, $2, $3, $4, $5)`;
    pool.query(queryStr, [productId, body, date, name, email], (err, results) => {
      console.log('this is err:', err);
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },

  addAnswer: (questionId, date, { body, name, email }, callback) => {
    let queryStr = `INSERT INTO answers (question_id, body, date, answerer_name, answerer_email) VALUES ($1, $2, $3, $4, $5)`;
    pool.query(queryStr, [questionId, body, date, name, email], (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },




  updateQuestionHelpful: (questionId, callback) => {
    let queryStr = `UPDATE questions SET question_helpfulness = question_helpfulness + 1 WHERE id = $1`;
    pool.query(queryStr, [questionId], (err, results) => {
      console.log('this is results:', results);
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },

  updateQuestionReport: (questionId, callback) => {
    let queryStr = `UPDATE questions SET reported = true WHERE id = $1`;
    pool.query(queryStr, [questionId], (err, results) => {
      console.log(err);
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },

  updateAnswerHelpful: (answerId, callback) => {
    let queryStr = `UPDATE answers SET helpfulness = helpfulness + 1 WHERE id = $1`;
    pool.query(queryStr, [answerId], (err, results) => {
      // console.log('this is results:', results);
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },

  updateAnswerReport: (answerId, callback) => {
    let queryStr = `UPDATE answers SET reported = true WHERE id = $1`;
    pool.query(queryStr, [answerId], (err, results) => {
      // console.log(err);
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },






}