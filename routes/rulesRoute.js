import express from 'express';
import getRules from '../controllers/rulesController.js';

const router = express.Router();

router.route('/').get(getRules);

export default router;
