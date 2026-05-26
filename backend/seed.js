import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';
import Product from './models/Product.js';

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smartcart');
  await Category.deleteMany({});
  await Product.deleteMany({});

  const catElectronics = await Category.create({ name: 'Electronics' });
  const catBooks = await Category.create({ name: 'Books' });
  const catStationery = await Category.create({ name: 'Stationery' });
  const catFashion = await Category.create({ name: 'Fashion' });
  const catEssentials = await Category.create({ name: 'Daily Essentials' });

  const products = [
    {
      name: 'Laptop Pro 15"',
      description: 'High-performance laptop perfect for coding and design.',
      price: 85000, rating: 4.8, popularity: 150, stock: 10, category: catElectronics._id,
    },
    {
      name: 'Wireless Noise-Canceling Headphones',
      description: 'Immersive sound for focused study sessions.',
      price: 12000, rating: 4.5, popularity: 200, stock: 25, category: catElectronics._id,
    },
    {
      name: 'Introduction to Algorithms (CLRS)',
      description: 'The ultimate guide to Data Structures and Algorithms.',
      price: 1500, rating: 4.9, popularity: 300, stock: 40, category: catBooks._id,
    },
    {
      name: 'Cracking the Coding Interview',
      description: 'Essential prep book for software engineering roles.',
      price: 900, rating: 4.7, popularity: 250, stock: 35, category: catBooks._id,
    },
    {
      name: 'Premium Notebook (Dotted)',
      description: 'High-quality paper for bullet journaling and notes.',
      price: 250, rating: 4.2, popularity: 120, stock: 100, category: catStationery._id,
    },
    {
      name: 'Gel Pen Set (10 Colors)',
      description: 'Smooth writing pens for creative note-taking.',
      price: 150, rating: 4.1, popularity: 80, stock: 200, category: catStationery._id,
    },
    {
      name: 'Campus Hoodie (Navy Blue)',
      description: 'Comfortable and warm hoodie with college logo.',
      price: 1200, rating: 4.6, popularity: 400, stock: 50, category: catFashion._id,
    },
    {
      name: 'Graphic T-Shirt (Code Sleep Repeat)',
      description: '100% cotton t-shirt for developers.',
      price: 499, rating: 4.3, popularity: 180, stock: 60, category: catFashion._id,
    },
    {
      name: 'Insulated Water Bottle',
      description: 'Keeps water cold for 24 hours. 1L capacity.',
      price: 750, rating: 4.4, popularity: 160, stock: 45, category: catEssentials._id,
    },
    {
      name: 'Desk Organizer',
      description: 'Keep your study desk neat and tidy.',
      price: 350, rating: 4.0, popularity: 90, stock: 30, category: catEssentials._id,
    },
    {
      name: 'Mechanical Keyboard (Blue Switches)',
      description: 'Tactile typing experience for programmers.',
      price: 4500, rating: 4.7, popularity: 220, stock: 15, category: catElectronics._id,
    },
    {
      name: 'Ergonomic Office Chair',
      description: 'Supportive chair for long study and coding hours.',
      price: 6500, rating: 4.5, popularity: 140, stock: 8, category: catEssentials._id,
    }
  ];

  await Product.insertMany(products);

  console.log('Database seeded with diverse items!');
  process.exit();
};

seed();
