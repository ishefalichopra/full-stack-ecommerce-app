require('dotenv').config({ path: '../.env' });
const authRoutes = require('./routes/auth');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:5173', 
  'https://full-stack-ecommerce-shefali-chopras-projects.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (
      allowedOrigins.includes(origin) || 
      /^https:\/\/full-stack-ecommerce-[\w-]+\.vercel\.app$/.test(origin)
    ) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin); 
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/public', express.static('public')); 
app.use('/uploads', express.static('uploads'));

app.use('/api', (req, res, next) => {
  console.log(`API Request: ${req.method} ${req.originalUrl}`, req.body || '');
  next();
});

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// MongoDB connection with better options
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });