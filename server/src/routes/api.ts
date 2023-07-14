import { Router } from 'express';

import {
  getAllCourses,
  getAllUnitProgress,
  getAllUnitsBySlug,
  getArticleBySlug,
  getAutoCompleteResults,
  getLearningProgress,
  getSearchResults,
  getVideoBySlug,
} from '../controllers/Learning';

import { getStatus } from '../controllers/status';

const api = Router();

/**
 * @route GET /status
 * @description Get Status of Database
 * @access public
 */
api.get('/status', getStatus);

/**
 * @route GET /courses
 * @description Get all the courses
 * @access public
 */
api.get('/courses', getAllCourses);

/**
 * @route GET /units
 * @description Get a specific course by ID
 * @access public
 */
api.get('/units', getAllUnitsBySlug);

/**
 * @route GET /article
 * @description Get all the articles
 * @access public
 */
api.get('/article', getArticleBySlug);

/**
 * @route GET /video
 * @description Get all videos in the database
 * @access public
 */
api.get('/video', getVideoBySlug);

/**
 * @route GET /search
 * @description Get all the search results
 * @access public
 */
api.get('/search', getSearchResults);

/**
 * @route GET /searchAutoComplete
 * @description Get all the autocomplete results
 * @access public
 */
api.get('/searchAutoComplete', getAutoCompleteResults);

/**
 * @route GET /learningProgress
 * @description Get course progress
 * @access public
 */
api.get('/learningProgress', getLearningProgress);

/**
 * @route GET /unitsProgress
 * @description Get a specific course by ID
 * @access public
 */
api.get('/unitsProgress', getAllUnitProgress);

export default api;
