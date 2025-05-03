const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  category: String,
  name: String,
  description: String,
  pdfUrl: String,
  imageUrl: String
});

module.exports = mongoose.model('Product', productSchema);
