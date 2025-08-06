require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios');
const Product = require('./models/Product');


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        seedDatabase();
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

async function seedDatabase() {
    try {
        const res = await axios.get('https://dummyjson.com/products?limit=100');
        const products = res.data.products;

        const formatted = products.map((p) => ({
            title: p.title,
            price: p.price,
            description: p.description,
            images: p.images.map(img =>
                img.startsWith('http') ? img : `https://${img}`
            ),
            inStock: true
        }));

        await Product.deleteMany({});
        await Product.insertMany(formatted);
        console.log(`Seeded ${formatted.length} products with images.`);
        mongoose.disconnect();
    } catch (error) {
        console.error('Seeding failed:', error.message);
        mongoose.disconnect();
    }
}