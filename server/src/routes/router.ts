import { Router } from 'express';

import { getStatus } from '../controllers/status';
import getAllObjects from '../controllers/courses';


const router = Router();

/**
 * @route GET /status
 * @description Get Status of Database
 * @access public
 */
router.get('/status', getStatus);

/**
 * @route GET /courses
 * @description Get all the courses
 * @access public
 */
router.get('/courses', getAllObjects);

export default router;
