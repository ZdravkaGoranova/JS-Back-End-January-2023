const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const routes = require('./routes.js');
const { authentication } = require('./middlewares/authMddleware.js')

const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));
app.set('view engine', 'hbs')

app.use('/static', express.static('public'));
app.use(express.urlencoded({ extended: false }));//add body parser
app.use(cookieParser());
app.use(authentication);//важно е мястото
app.use(routes);

//TODO:change database name
mongoose.set('strictQuery', false);
mongoose.connect(`mongodb://127.0.0.1:27017/petstagram`);


app.listen(3000, () => console.log('Server is running on port 3000...'))