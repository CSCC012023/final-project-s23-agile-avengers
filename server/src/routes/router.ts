import { Router } from 'express';

import {
  getAllCourses,
  getAllUnitProgress,
  getAllUnitsBySlug,
  getArticleBySlug,
  getAutoCompleteResults,
  getLearningProgress,
  getSearchResults,
  getUnitProgress,
  getVideoBySlug,
} from '../controllers/Learning';

import { createNewUser } from '../controllers/Account/user';
import { getStatus } from '../controllers/status';

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
 * @route GET /unitsProgess
 * @description Get a specific course by ID
 * @access public
 */
router.get('/unitsProgess', getAllUnitProgress);

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
 * @route GET /search
 * @description Get all the search results
 * @access public
 */
router.get('/search', getSearchResults);

/**
 * @route GET /searchAutoComplete
 * @description Get all the autocomplete results
 * @access public
 */
router.get('/searchAutoComplete', getAutoCompleteResults);

/**
 * @route GET /learningProgress
 * @description Get course progress
 * @access public
 */
router.get('/learningProgress', getLearningProgress);

/**
 * @route GET /progress
 * @description Get unit progress of a user
 * @access public
 */
router.get('/progress', getUnitProgress);

export default router;
