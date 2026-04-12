const express = require('express');

const default_routes = require('./routes/default_routes');

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.set('view engine', 'ejs');

app.use(default_routes);

app.listen(3000, () => {
  console.log('Connected to Localhost');
});
