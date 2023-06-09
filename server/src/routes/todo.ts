import { Router } from 'express';

import {
  getSingleTodo,
  getAllTodo,
  postCreateTodo,
  putUpdateTodo,
  deleteTodo,
} from '../controllers/todo';

const router = Router();

/**
 * @route GET /todos/:id
 * @description get a todo
 * @access public
 */
router.get('/todos/:id', getSingleTodo);

/**
 * @route GET /todos
 * @description get all todo
 * @access public
 */
router.get('/todos', getAllTodo);

/**
 * @route POST /todos
 * @description add a new todo
 * @access public
 */
router.post('/todos', postCreateTodo);

/**
 * @route PUT /todos/:id
 * @description update todo
 * @access public
 */
router.put('/todos/:id', putUpdateTodo);

/**
 * @route DELETE /todos/:id
 * @description delete todo
 * @access public
 */
router.delete('/todos/:id', deleteTodo);

export default router;
