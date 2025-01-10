const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const router = express.Router();

// Halaman Login
router.get('/login', (req, res) => {
    res.render('login');
});

// Proses Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = user;
            return res.redirect('/products');
        }
        res.render('login', { error: 'Username atau password salah!' });
    } catch (err) {
        res.send(err.message);
    }
});

// Halaman Register
router.get('/register', (req, res) => {
    res.render('register');
});

// Proses Register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        req.session.user = newUser;
        res.redirect('/products');
    } catch (err) {
        res.render('register', { error: 'Gagal mendaftar, coba lagi!' });
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

module.exports = router;