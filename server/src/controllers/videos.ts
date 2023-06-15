import { Video } from '../types/learning';
import modelVideo from '../models/Learning/video';

/* Controller method that uses the model modelCourse to retrieve all modelCourse objects */
const getContentVideo = async (req: any, res: any) => {
  modelVideo
    .find()
    .then((data: Video[]) => res.status(200).json(data))
    .catch((error: Error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    });
};

export default getContentVideo;
