import { User } from '../models/index.js';

const cleanDB = async (): Promise<void> => {
  try {
    await User.deleteMany({});
    console.log('Users cleaned.');
    
  } catch (err) {
    console.error('Error cleaning Users:', err);
    process.exit(1);
  }
};

export default cleanDB;
