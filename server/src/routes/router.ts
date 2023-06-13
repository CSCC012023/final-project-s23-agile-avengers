import { Router } from 'express';

import { getStatus } from '../controllers/status';
import { postCreateUser } from '../controllers/user';

const router = Router();

/**
 * @route GET /status
 * @description Get Status of Database
 * @access public
 */
router.get('/status', getStatus);


/**
 * @route POST /user/:id
 * @description Create a new user in Database which is retrieved from Clerk
 * @access public
 */
router.post('/user', postCreateUser);

export default router;
