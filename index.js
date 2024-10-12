const express = require('express');
const router = require('./routes/MyAPI');

const app = express();

app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: false }))
app.use(router);


app.listen(8080, () => {
    console.log("Starting serever at port 8080");
})

exports.module = app;