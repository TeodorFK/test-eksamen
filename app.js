const express = require('express');

const default_routes = require('./routes/default_routes');
const user_routes = require('./routes/user_routes');
const admin_routes = require('./routes/admin_routes');
const dbHandler = require('./handler/db_handler');
const cookieParser = require('cookie-parser');
const { checkUser } = require('./middleware/checkUser');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');

app.use(checkUser);
app.use(default_routes);
app.use(user_routes);
app.use(admin_routes);

app.listen(3000);
dbHandler.connectToDatabase('mongodb://10.12.5.9:27017/test-eksamen');
