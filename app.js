const express = require('express'); // imports require express with require function

const app = express(); // express is a function that we can execute

app.get('/', function (req, res) {
  res.send('<h1>Hello World!</h1>');
}); // a path (route) to  listen incoming request and 'do something'

app.listen(3000); // to start listen for incoming request on a certain port
