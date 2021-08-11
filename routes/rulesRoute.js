import express from 'express';
import rulesController from '../controllers/rulesController.js';

const router = express.Router();

router.route('/').get(rulesController);

export default router;
