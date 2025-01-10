const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
    nama: { type: String, required: true },
});
module.exports = mongoose.model('Category', CategorySchema);
