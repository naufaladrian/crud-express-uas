const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    nama: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    harga: { type: Number, required: true },
    jml_stok: { type: Number, required: true },
});
module.exports = mongoose.model('Product', ProductSchema);
