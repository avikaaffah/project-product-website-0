const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect('mongodb://localhost:27017/productpromo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const products = [
  {
    category: "Alignment",
    name: "Acoem_AT-300",
    description: "The Precision Alignment Tool X1 offers unparalleled accuracy for industrial and mechanical alignment tasks. Lightweight and easy to use.",
    pdfUrl: "/product-data/alignment/1/Acoem_AT-300.pdf",
    imageUrl: "/product-data/alignment/1/Acoem_AT-300.png"
  },
  {
    category: "Alignment",
    name: "Acoem_AT-400",
    description: "Alignment Pro 3000 is designed for professionals requiring fast and reliable alignment solutions with advanced sensor technology.",
    pdfUrl: "/product-data/alignment/2/Acoem_AT-400.pdf",
    imageUrl: "/product-data/alignment/2/Acoem_AT-400.png"
  },
  {
    category: "Alignment",
    name: "Acoem_AT-400",
    description: "Alignment Pro 3000 is designed for professionals requiring fast and reliable alignment solutions with advanced sensor technology.",
    pdfUrl: "/product-data/alignment/2/Acoem_AT-400.pdf",
    imageUrl: "/product-data/alignment/2/Acoem_AT-400.png"
  },
  {
    category: "Alignment",
    name: "Acoem_AT-300",
    description: "The Precision Alignment Tool X1 offers unparalleled accuracy for industrial and mechanical alignment tasks. Lightweight and easy to use.",
    pdfUrl: "/product-data/alignment/1/Acoem_AT-300.pdf",
    imageUrl: "/product-data/alignment/1/Acoem_AT-300.png"
  },
  
  {
    category: "Thermal Camera",
    name: "Flir E8 New Model",
    description: "ThermoVision T100 delivers high-resolution thermal imaging for industrial inspections and maintenance, with intuitive controls.",
    pdfUrl: "https://example.com/ThermoVision_T100.pdf",
    imageUrl: "/product-data/thermal-camera/1/Flir-E8-XT-NEW-MODEL-Thermal-Imaging-Camera.png"
  },
  {
    category: "Thermal Camera",
    name: "Flir T530",
    description: "InfraScan Pro is a portable thermal camera designed for quick diagnostics and energy audits, featuring long battery life.",
    pdfUrl: "https://example.com/InfraScan_Pro.pdf",
    imageUrl: "/product-data/thermal-camera/2/Flir_T530-1500x1500.jpg"
  }
];

async function insertProducts() {
  try {
    await Product.deleteMany({}); // Hapus data lama (opsional)
    await Product.insertMany(products);
    console.log('Data produk berhasil dimasukkan!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Gagal memasukkan data produk:', err);
  }
}

insertProducts();
