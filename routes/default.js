const express = require('express');

const router = express.Router(); // gives router class to express, a complete routing system

router.get('/', function (req, res) {
  // const htmlFilePath = path.join(__dirname, 'views', 'index.html');
  // res.sendFile(htmlFilePath);
  res.render('index');
});

router.get('/about', function (req, res) {
  res.render('about');
});

module.exports = router; // exporting this configuring router