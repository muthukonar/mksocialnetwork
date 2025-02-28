import { User, Thought } from '../models/index.js';
import { Request, Response } from 'express';

// Get all users
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().populate('friends thoughts');
    return res.json(users);  
  } catch (err) {
    return res.status(500).json(err);  
  }
};

// Get a single user
export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.userId }).select('-__v').populate('friends thoughts');

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    return res.json(user);  
  } catch (err) {
    return res.status(500).json(err);  
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    return res.json(user);  
  } catch (err) {
    return res.status(500).json(err);  
  }
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    return res.json(user);  
  } catch (err) {
    return res.status(500).json(err);  
  }
};

// Delete a user by ID and their associated thoughts
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    // Delete associated thoughts
    await Thought.deleteMany({ userId: req.params.userId });

    return res.json({ message: 'User and associated thoughts deleted!' });  
  } catch (err) {
    return res.status(500).json(err);  
  }
};
