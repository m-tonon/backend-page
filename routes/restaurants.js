const express = require('express');
const uuid = require('uuid'); // require the uuid third package

const router = express.Router();

const resData = require('../util/restaurant-data'); // require the restaurant-data.js file

router.get('/restaurants', function (req, res) {
  const storedRestaurants = resData.getStoredRestaurants();

  res.render('restaurants', {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

router.get('/restaurants/:id', function (req, res) {
  // this define a dynamic route called 'id'
  const restaurantId = req.params.id;
  const storedRestaurants = resData.getStoredRestaurants();

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render('restaurant-detail', { restaurant: restaurant });
      // the first restaurant from {} is indexed to the h1 element on restaurant-detail.ejs
      // the second one is indexed to the constant of the loop
    }
  }

  res.status(404).render('404');
});

router.get('/recommend', function (req, res) {
  res.render('recommend');
});

router.post('/recommend', function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4(); //generate an id to the restaurant object
  // accessing a property that dont exist, JS will create it
  const restaurants = resData.getStoredRestaurants();

  restaurants.push(restaurant);

  resData.storeRestaurants(restaurants);

  res.redirect('/confirm');
});

router.get('/confirm', function (req, res) {
  res.render('confirm');
});

module.exports = router;
