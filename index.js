const mongoose = require('mongoose');
const express = require('express');
const app = express();
const api = require('./api');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', api);

mongoose.connect('mongodb://localhost:27017/curso', { useNewUrlParser: true }).then(() => {

    app.listen(3000, () => {
        console.log('sadasd');
    })

}).catch(error => {
    console.log("error inesperado", error);

});

console.log("Hola mundo desde nodejs");

