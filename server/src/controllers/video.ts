import { Request, Response } from 'express';
import { Video } from '../types/learning';

import { modelUser } from '../models/Account/user';
import { modelProgress } from '../models/Learning/progress';
import modelVideo from '../models/Learning/video';

/**
 * Retrives a Video with a matching `slug`
 *
 * @param {Request} req - Must contain `videoSlug` in query
 * @param {Response} res - Response Object
 *
 * @return {Response}  Response Object with an Error or Video
 */
export const getVideoBySlug = async (req: Request, res: Response) => {
  // Checks if the field `videoSlug` is included in the query
  if (!req.query.videoSlug)
    return res
      .status(400)
      .json({ message: 'Invalid Request: Missing field "videoSlug".' });

  const video = await modelVideo.findOne<Video>({ slug: req.query.videoSlug });

  return !video
    ? res.status(404).send({ message: 'Not Found: Video does not exist.' })
    : res.status(200).json({ video: video });
};

/**
 * Retrives the progress of a video with 'videoId' and 'user'
 *
 * @param {Request} req - Must contain `videoId` and 'user' in query
 * @param {Response} res - Response Object
 *
 * @return {Response}  Response Object with an Error or Video Progress value
 */
export const getVideoProgress = async (req: Request, res: Response) => {
  // Checks if the field `videoID` is included in the query
  if (!req.query.userID)
    return res
      .status(400)
      .json({ message: 'Invalid Request: Missing field "userID".' });

  if (!req.query.videoID)
    return res
      .status(400)
      .json({ message: 'Invalid Request: Missing field "videoID".' });

  const user = await modelUser.findOne({ userID: req.query.userID });
  const video = await modelVideo.findOne({ videoId: req.query.videoID });
  const progress = await modelProgress.findOne({ userID: req.query.userID });


};
/**
 * Retrives the progress of a video with 'videoId' and 'user'
 *
 * @param {Request} req - Must contain `videoId` and 'user' in query
 * @param {Response} res - Response Object
 *
 * @return {Response}  Response Object with an Error
 */
export const updateVideoProgress = async (req: Request, res: Response) => {
  // Checks if the field `videoID` is included in the query
  if (!req.query.userID)
    return res
      .status(400)
      .json({ message: 'Invalid Request: Missing field "userID".' });

  if (!req.query.videoID)
    return res
      .status(400)
      .json({ message: 'Invalid Request: Missing field "videoID".' });

  if (!req.query.videoProgressPercent)
    return res
      .status(400)
      .json({ message: 'Invalid Request: Missing field "videoProgressPercent".' });

  const user = await modelUser.findOne({ userID: req.query.userID });
  const video = await modelVideo.findOne({ videoId: req.query.videoID });
  const progress = await modelProgress.find({userID: user?._id, videos: { $elemMatch: { videoID: video?._id } } });

  console.log(progress);

  return res.send(200).json(progress)
};