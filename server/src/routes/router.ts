import { Router } from 'express';

import { getStatus } from '../controllers/status';
import { postCreateUser } from '../controllers/user';
import getAllObjects from '../controllers/courses';
import { getAllUsers } from '../controllers/user';

const router = Router();

/**
 * @route GET /status
 * @description Get Status of Database
 * @access public
 */
router.get('/status', getStatus);

/**
 * @route POST /user
 * @description Create a new user in Database which is retrieved from Clerk
 * @access public
 */
router.post('/user', postCreateUser);

/**
 * @route GET /user
 * @description Get all users in the database
 * @access public
 */
router.get('/user', getAllUsers);

/**
 * @route GET /courses
 * @description Get all the courses
 * @access public
 */
router.get('/courses', getAllObjects);

export default router;
