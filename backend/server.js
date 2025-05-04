require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/products');

const app = express();

// CORS configuration - In Docker, frontend will communicate via nginx proxy
const corsOptions = {
  origin: ['http://localhost:3000', 'http://frontend', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Add to your server.js after middleware setup but before routes

// Serve static files from product-data directory
app.use('/product-data', express.static(path.join(__dirname, 'product-data')));

// Log available static resources
console.log('Static files will be served from:', path.join(__dirname, 'product-data'));
try {
  const fs = require('fs');
  const availableFiles = [];
  
  function listFiles(dir, baseDir = '') {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        listFiles(filePath, path.join(baseDir, file));
      } else {
        availableFiles.push(path.join(baseDir, file));
      }
    });
  }
  
  if (fs.existsSync(path.join(__dirname, 'product-data'))) {
    listFiles(path.join(__dirname, 'product-data'), '/product-data');
    console.log('Available static files:', availableFiles);
  } else {
    console.log('Product data directory does not exist');
  }
} catch (err) {
  console.error('Error scanning static files:', err);
}

// Basic route for API health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Product routes
app.use('/api/products', productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error encountered:', err);
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'production' ? 'Server Error' : err.message 
  });
});

// Connect to MongoDB with better error handling
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/productpromo';
console.log('Connecting to MongoDB at:', mongoUri.replace(/:\/\/([^:]+):[^@]+@/, '://***:***@')); // Log without showing credentials

mongoose.connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected successfully');
    
    // Add some test data if specified
    if (process.env.ADD_TEST_DATA === 'true') {
      require('./seed/seedData')();
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if cannot connect to database
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`API available at http://localhost:${PORT}/api/health`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  mongoose.connection.close();
  process.exit(0);
});