const fs = require('fs');
const path = require('path'); // build-in path package to construct routes

const express = require('express');
const uuid = require('uuid'); // require the uuid third package
const { render } = require('ejs');

const app = express();

app.set('views', path.join(__dirname, 'views'));
// the directory where the template files are located
app.set('view engine', 'ejs'); // the template engine to use

app.use(express.static('public')); // middleware to serve static files as CSS & JS)
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  // const htmlFilePath = path.join(__dirname, 'views', 'index.html');
  // res.sendFile(htmlFilePath);
  res.render('index');
});

app.get('/restaurants', function (req, res) {
  const filePath = path.join(__dirname, 'data', 'restaurants.json');

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  res.render('restaurants', {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

app.get('/restaurants/:id', function (req, res) {
  // this define a dynamic route called 'id'
  const restaurantId = req.params.id;
  const filePath = path.join(__dirname, 'data', 'restaurants.json');

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render('restaurant-detail', { restaurant: restaurant });
      // the first restaurant from {} is indexed to the h1 element on restaurant-detail.ejs
      // the second one is indexed to the constant of the loop
    }
  }

  res.render('404');
});

app.get('/recommend', function (req, res) {
  res.render('recommend');
});

app.post('/recommend', function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4(); //generate an id to the restaurant object

  // accessing a property that dont exist, JS will create it

  const filePath = path.join(__dirname, 'data', 'restaurants.json');

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  storedRestaurants.push(restaurant);

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

  res.redirect('/confirm');
});

app.get('/confirm', function (req, res) {
  res.render('confirm');
});

app.get('/about', function (req, res) {
  res.render('about');
});

app.use(function (req, res) {
  res.render('404');
}) // function to redirect to 404 page for all non-exists routes

app.use(function(error, req, res, next) { // error is generated automatically by express
  res.render('500');
})

app.listen(3000);