const express = require('express');
const path = require('path');
// const morgan = require('morgan');
const db =  require('./db/index.js');
require('dotenv').config();
const app = express();
const port = 3000;
const router = require('./router.js');

//attach middleware
// app.use(morgan('dev'));
app.use(express.json());
// app.use(express.urlencoded({extended: true}));

app.use('/qa', router);


app.get(`/${process.env.LOADER_IO_KEY}`, (req, res) => {
  res.status(200).send(process.env.LOADER_IO_KEY);
});




app.listen(port, () => {
  console.log(`App running on port ${port}`)
});