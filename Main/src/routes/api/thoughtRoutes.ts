import { Router } from 'express';
const router = Router();
import { getThoughts, getSingleThought, createThought, updateThought, deleteThought, addThoughtReaction, removeThoughtReaction } from '../../controllers/thoughtController';

// /api/videos
router.route('/').get(getThoughts).post(createThought);

// /api/videos/:videoId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/videos/:videoId/responses
router.route('/:thoughtId/reactions').post(addThoughtReaction);

// /api/videos/:videoId/responses/:responseId
router.route('/:thoughtId/reactions/:reactionId').delete(removeThoughtReaction);

export default router;
