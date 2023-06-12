import { Course } from '../../types/learning';
import  modelCourse from '../models/Learning/course';

/* Controller method that uses the model modelCourse to retrieve all modelCourse objects */
const getAllObjects = async (req: any, res: any) => {
    try {
      const allObjects: Course[] = await modelCourse.find();
      res.json(allObjects);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

export default getAllObjects;
