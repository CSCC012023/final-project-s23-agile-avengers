import { Video } from '../types/learning';
import { Request, Response } from 'express';
import modelVideo from '../models/Learning/video';

/* Controller method that uses the model modelCourse to retrieve all modelCourse objects */
const getContentVideo = async (req: Request, res: Response) => {
  // modelVideo
  //   .find()
  //   .then((data: Video[]) => res.status(200).json(data))
  //   .catch((error: Error) => {
  //     console.error(error);
  //     res.status(500).json({ error: 'Internal server error' });
  //   });
  const videos = await modelVideo.find();
  return res.status(200).json(videos);
};

export default getContentVideo;
