const express = require('express');
const router = require('./routes/MyAPI');
const path = require('path');

const app = express();


// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }))
app.use(router);


app.listen(8080, () => {
    console.log("Starting serever at port 8080");
})

module.exports = app;