import { Request, Response } from 'express';
import  modelCourse from '../models/Learning/course';

const getAllObjects = async (req: any, res: any) => {
    try {
      const allObjects = await modelCourse.find();
      res.json(allObjects);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };


export default getAllObjects;