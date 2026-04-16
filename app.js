const express = require('express');
const path = require("path")
const cookieParser = require('cookie-parser');

const default_routes = require('./routes/default_routes');
const user_routes = require('./routes/user_routes');
const authorized_routes = require('./routes/authorize_routes');
const dbHandler = require('./handler/db_handler');
const { checkUser } = require('./middleware/checkUser');
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');

app.use(checkUser);
app.use(default_routes);
app.use(user_routes);
app.use(authorized_routes);

app.listen(3000);
dbHandler.connectToDatabase('mongodb://10.12.5.9:27017/test-eksamen');
