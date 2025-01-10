const express = require('express');
const Category = require('../models/category');
const router = express.Router();

// Tampilkan semua kategori
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.render('categories', { categories });
    } catch (err) {
        res.send(err.message);
    }
});

module.exports = router;
