import mongoose from 'mongoose';
import connection from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import cleanDB from './cleanDB.js';
import { getRandomUsername, getRandomThoughts } from './data.js';

const seedDatabase = async () => {
  try {
    const db = await connection();
    console.log('Connected to database');

    if (!db.db) {
      throw new Error('Database connection is not established.');
    }

    await cleanDB();
   
    const thoughtCheck = await db.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      await db.db.dropCollection('thoughts');
    }

    const userCheck = await db.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await db.db.dropCollection('users');
    }

    const users = [];
    const thoughts = getRandomThoughts(1); 

    for (let i = 0; i < 1; i++) {
      const username = getRandomUsername(); 
      users.push({
        username: username,
        email: `${username.toLowerCase()}@example.com`,
      });
    }

    
    await User.insertMany(users);

    
    await Thought.insertMany(thoughts);

    console.table(users);
    console.info('Seeding complete! 🌱');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

seedDatabase();
