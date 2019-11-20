
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const StationsController = require('./stations/controller');
const CarsController = require('./cars/controller');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });

const database = mongoose.connection;
database.on('error', () => {
  console.log('Error on database connection')
});

database.once('open', () => {
  console.log('Connected to database');
})

app.use('/stations', StationsController);
app.use('/cars', CarsController);


app.listen(8080, () => {
  console.log(`Server listening on 8080`);
});

module.exports = app;
