const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pentru sesiune
app.use(session({
    secret: '1234567890abcdefghijklmnopqrstuvwxyz',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Middleware-uri clasice
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Setări pentru EJS și foldere
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views', 'pages'));

const staticPath = path.join(__dirname, 'src');
app.use(express.static(staticPath));


const indexRoutes = require('./routes/index');
const shoppingCartRoutes = require('./routes/shoppingCart');
const authRoutes = require('./routes/authentication');

const imageGenerationRoutes = require('./routes/openAi-image');
app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/', shoppingCartRoutes);
app.use('/api', imageGenerationRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
