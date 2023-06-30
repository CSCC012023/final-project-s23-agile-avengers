import { Router } from 'express';

import { getStatus } from '../controllers/status';
import { getAllUsers, createNewUser } from '../controllers/user';
import { getAllCourses } from '../controllers/courses';
import { getAllUnitsBySlug } from '../controllers/units';
import { getArticleBySlug } from '../controllers/article';
import { getVideoBySlug } from '../controllers/videos';

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
router.post('/user', createNewUser);

/*
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
router.get('/courses', getAllCourses);

/**
 * @route GET /units
 * @description Get a specific course by ID
 * @access public
 */
router.get('/units', getAllUnitsBySlug);

/**
 * @route GET /article
 * @description Get all the articles
 * @access public
 */
router.get('/article', getArticleBySlug);

/**
 * @route GET /video
 * @description Get all videos in the database
 * @access public
 */
router.get('/video', getVideoBySlug);

export default router;
