// import { Router } from 'express';
// import User from '../../models/User.js';

// const router = Router();

// // Add a friend to a user's friend list
// router.post('/users/:userId/friends/:friendId', async (req, res) => {
//     try {
//       const user = await User.findByIdAndUpdate(
//         req.params.userId,
//         { $addToSet: { friends: req.params.friendId } },
//         { new: true }
//       ).populate('friends');
  
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       return res.json(user);
//     } catch (error) {
//       return res.status(500).json(error);
//     }
//   });
  
//   // Remove a friend from a user's friend list
//   router.delete('/users/:userId/friends/:friendId', async (req, res) => {
//     try {
//       const user = await User.findByIdAndUpdate(
//         req.params.userId,
//         { $pull: { friends: req.params.friendId } },
//         { new: true }
//       ).populate('friends');
  
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       return res.json(user);
//     } catch (error) {
//       return res.status(500).json(error);
//     }
//   });

// export default router;


import { Router } from 'express';
import User from '../../models/User.js';

const router = Router();

// Add a friend to a user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    ).populate('friends');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    ).populate('friends');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default router;
