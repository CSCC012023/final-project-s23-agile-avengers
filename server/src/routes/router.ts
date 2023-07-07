import { Router } from 'express';

import { getArticleBySlug } from '../controllers/article';
import { getAllCourses } from '../controllers/courses';
import { getStatus } from '../controllers/status';
import { getAllUnitsBySlug } from '../controllers/units';
import { createNewUser, getAllUsers } from '../controllers/user';
import { getVideoBySlug, getVideoProgress, updateVideoProgress } from '../controllers/video';
import { tempInsert } from '../controllers/tempInsert';
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

/**
 * @route PATCH /videoProgress
 * @description Get all progress of a video for a user
 * @access public
 */
router.patch('/videoProgress', updateVideoProgress);

/**
 * @route GET /videoProgress
 * @description Get all progress of a video for a user
 * @access public
 */
router.get('/videoProgress', getVideoProgress);

/**
 * @route GET /learningProgress
 * @description Get course progress
 * @access public
 */
router.get('/temp', tempInsert);



export default router;
