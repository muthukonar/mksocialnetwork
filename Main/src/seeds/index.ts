import mongoose from 'mongoose';
import connection from '../config/connection.js';
import { User } from '../models/index.js';
import { getRandomUsername } from './data.js';

const seedDatabase = async () => {
  try {
    const db = await connection();
    console.log('Connected to database');

    if (!db.db) {
      throw new Error('Database connection is not established.');
    }

    // Delete the collections if they exist
    const userCheck = await db.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await db.db.dropCollection('users');
    }

    const users = [];

    for (let i = 0; i < 20; i++) {
      users.push({
        username: getRandomUsername(),
        email: `${getRandomUsername().toLowerCase()}@example.com`,
        // friends: getRandomFriends(3),
      });
    }

    await User.insertMany(users);

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
