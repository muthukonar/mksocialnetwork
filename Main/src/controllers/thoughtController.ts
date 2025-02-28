import { Thought, User } from '../models/index.js';
import { Request, Response } from 'express';

export const getThoughts = async (_req: Request, res: Response) => {
    try {
      const thoughts = await Thought.find();
      return res.json(thoughts);  
    } catch (err) {
      return res.status(500).json(err);  
    }
  };
  
  // Get a single thought by ID
  export const getSingleThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
  
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
        return res.json(thought);  
    } catch (err) {
      return res.status(500).json(err);  
    }
  };
  
  // Create a new thought
  export const createThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findByIdAndUpdate(
        req.body.userId,
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({
          message: 'Thought created, but found no user with that ID',
        });
      }
  
      return res.json('Created the thought 🎉');  
    } catch (err) {
      return res.status(500).json(err);  
    }
  };
  
  // Update a thought by ID
  export const updateThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
  
      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
  
      return res.json(thought);  
    } catch (err) {
      return res.status(500).json(err);  
    }
  };
  
  // Delete a thought by ID
  export const deleteThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
  
      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
  
      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'Thought deleted but no user with this id!' });
      }
  
      return res.json({ message: 'Thought successfully deleted!' });  
    } catch (err) {
      return res.status(500).json(err);  
    }
  };
  
  // Add a reaction to a thought
  export const addThoughtReaction = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
  
      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
  
      return res.json(thought);  
    } catch (err) {
      return res.status(500).json(err);  
    }
  };
  
  // Remove a reaction from a thought
  export const removeThoughtReaction = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
  
      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
  
      return res.json(thought);  
    } catch (err) {
      return res.status(500).json(err);  
    }
  };
  