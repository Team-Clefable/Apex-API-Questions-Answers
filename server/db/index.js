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
  queryAllQuestions: (productId, callback) => {
    let queryStr = `SELECT * FROM questions WHERE product_id = $1 ORDER BY question_helpfulness DESC`;
    console.log('this is productId:', productId);
    pool.query(queryStr, [productId], (err, res) => {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  },

  // queryAnswers: (req, callback) {
  //   let queryStr = //`Fill in query string`;
  //   pool.query(queryStr, (err, results) => {
  //     if (err) {
  //       callback(err);
  //     } else {
  //       callback(null, results);
  //     }
  //   });
  // },







}