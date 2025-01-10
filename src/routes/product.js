const express = require('express');
const Product = require('../models/product');
const Category = require('../models/category');
const router = express.Router();

// Middleware untuk autentikasi
function isAuthenticated(req, res, next) {
    if (req.session.user) return next();
    res.redirect('/login');
}

// Tampilkan semua produk
router.get('/products', isAuthenticated, async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.render('products', { products });
    } catch (err) {
        res.send(err.message);
    }
});

// Halaman tambah produk
router.get('/products/new', isAuthenticated, async (req, res) => {
    try {
        const categories = await Category.find();
        res.render('new_product', { categories });
    } catch (err) {
        res.send(err.message);
    }
});

// Tambah produk baru
router.post('/products', isAuthenticated, async (req, res) => {
    const { nama, harga, category, jml_stok } = req.body;
    try {
        const newProduct = new Product({ nama, harga, category, jml_stok });
        await newProduct.save();
        res.redirect('/products');
    } catch (err) {
        res.send(err.message);
    }
});

// Halaman edit produk
router.get('/products/:id/edit', isAuthenticated, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        const categories = await Category.find();
        res.render('edit_product', { product, categories });
    } catch (err) {
        res.send(err.message);
    }
});

// Update produk
router.post('/products/:id', isAuthenticated, async (req, res) => {
    const { nama, harga, category, jml_stok } = req.body;
    try {
        await Product.findByIdAndUpdate(req.params.id, { nama, harga, category, jml_stok });
        res.redirect('/products');
    } catch (err) {
        res.send(err.message);
    }
});

// Hapus produk
router.post('/products/:id/delete', isAuthenticated, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/products');
    } catch (err) {
        res.send(err.message);
    }
});

module.exports = router;