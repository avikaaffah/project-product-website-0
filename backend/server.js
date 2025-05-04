require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/products');

const app = express();
// app.use(cors());
app.use(express.json());

// const corsOptions = {
//     origin: ['https://product-papa-mantap.netlify.app', 'http://localhost:5500'],
//     optionsSuccessStatus: 200
//   };
//   app.use(cors(corsOptions));

const corsOptions = {
  origin: ['http://localhost:5500'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

//   // Route dan middleware lain
//   app.get('/api/products', (req, res) => {
//     // logika API
//     res.json({ message: 'API berjalan lancar' });
//   });

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/productpromo';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
