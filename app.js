const fs = require('fs');
const path = require('path'); // build-in path package to construct routes

const express = require('express');

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
  // const htmlFilePath = path.join(__dirname, 'views', 'restaurants.html');
  // res.sendFile(htmlFilePath);
  res.render('restaurants');
});

app.get('/recommend', function (req, res) {
  // const htmlFilePath = path.join(__dirname, 'views', 'recommend.html');
  // res.sendFile(htmlFilePath);
  res.render('recommend');
});

app.post('/recommend', function (req, res) {
  const restaurant = req.body;
  const filePath = path.join(__dirname, 'data', 'restaurants.json');

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  storedRestaurants.push(restaurant);

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

  res.redirect('/confirm');
});

app.get('/confirm', function (req, res) {
  // const htmlFilePath = path.join(__dirname, 'views', 'confirm.html');
  // res.sendFile(htmlFilePath);
  res.render('confirm');
});

app.get('/about', function (req, res) {
  // const htmlFilePath = path.join(__dirname, 'views', 'about.html');
  // res.sendFile(htmlFilePath);
  res.render('about');
});

app.listen(3000);
