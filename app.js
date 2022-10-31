const path = require('path'); // build-in path package to construct routes

const express = require('express');

const defaultRoutes = require('./routes/default'); // require the default.js file
const restaurantRoutes = require('./routes/restaurants');

const app = express();

app.set('views', path.join(__dirname, 'views'));
// the directory where the template files are located
app.set('view engine', 'ejs'); // the template engine to use

app.use(express.static('public')); // middleware to serve static files as CSS & JS)
app.use(express.urlencoded({ extended: false }));

app.use('/', defaultRoutes); // requests with ('/' - filter) will be handle by 'defaultRoutes'

app.use('/', restaurantRoutes);

app.use(function (req, res) {
  res.status(404).render('404');
}); // function to redirect to 404 page for all non-exists routes
//status allows to set a costum status code

app.use(function (error, req, res, next) {
  // error is generated automatically by express
  res.status(500).render('500');
});

app.listen(3000);
