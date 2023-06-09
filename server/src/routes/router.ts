import { Router } from 'express';

import { getStatus } from '../controllers/status';

const router = Router();

/**
 * @route GET /status
 * @description Get Status of Database
 * @access public
 */
router.get('/status', getStatus);

export default router;
