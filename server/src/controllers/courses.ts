import { Request, Response } from 'express';
import modelCourse from '../models/Learning/course';

/* Controller method that uses the model modelCourse to retrieve all modelCourse objects */
export const getAllCourses = async (req: any, res: any) => {
  modelCourse
    .find()
    .select('-_id -__v -units')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error: Error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    });
};

export const getCourseByUnit = async (req: Request, res: Response) => {
  modelCourse
    .find({ units: { $eq: req.query.id } })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error: Error) => {
      console.error(error);
      if (!req.query.id?.length) {
        res.status(400).json({ error: 'Invalid ID' });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    });
};
