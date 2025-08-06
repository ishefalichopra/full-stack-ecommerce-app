require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');

async function createUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    console.log('DB Name:', mongoose.connection.name);

    const email = 'shefalichopra900@gmail.com';
    const name = 'Shefali Chopra';
    const password = 'shefaliAdmin@2025';

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists.');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10); 

      const user = new User({
        name,
        email,
        password: hashedPassword,
        role: 'admin'  
      });

      await user.save();
      console.log('Admin user created successfully');
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

createUser();
