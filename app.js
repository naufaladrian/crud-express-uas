const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const connectDB = require('./database');
const methodOverride = require('method-override');

const app = express();
connectDB();


app.use(methodOverride());

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

// Set EJS sebagai view engine
app.set('views', './src/views');
app.set('view engine', 'ejs');

// Routes
const authRoutes = require('./src/routes/auth');
const productRoutes = require('./src/routes/product');
const categoryRoutes = require('./src/routes/category');



app.use(authRoutes);
app.use(productRoutes);
app.use(categoryRoutes);

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
