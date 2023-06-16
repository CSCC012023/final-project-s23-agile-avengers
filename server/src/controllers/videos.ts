import { Request, Response } from 'express';

import modelVideo from '../models/Learning/video';

import { Video } from '../types/learning';

export const getContentVideo = async (req: Request, res: Response) => {
  const video = await modelVideo.findOne<Video>({ slug: req.query.videoSlug });
  // Check if course exists
  if (!video)
    return res
      .status(404)
      .send({ message: 'Not Found: Video does not exist.' });
  return res.status(200).json({
    video: video,
  });
};

export default getContentVideo;
