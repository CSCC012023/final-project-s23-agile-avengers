import { Course } from '../types/learning';
import modelCourse from '../models/Learning/course';

/* Controller method that uses the model modelCourse to retrieve all modelCourse objects */
const getAllObjects = async (req: any, res: any) => {
  modelCourse
    .find()
    .then((data: Course[]) => res.status(200).json(data))
    .catch((error: Error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    });
};

export default getAllObjects;
