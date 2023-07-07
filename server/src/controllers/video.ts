import { Request, Response } from 'express';
import { LearningProgress, Video, VideoProgress } from '../types/learning';

import { Types } from 'mongoose';
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
  if (!user) return res.status(404).json({message: 'user not found'});

  const video = await modelVideo.findOne({ videoId: req.query.videoID });
  if (!video) return res.status(404).json({message: 'video not found'});

  const progress = await modelProgress.findOne({
    userID: user._id
  });
  if (!progress) return res.status(400).send({message: 'user progress not found'})

  // const progressObj = progress.toObject();
  // if (checkIfVideoExists(video._id, progress)) {
  //   const progressPercentageCurrent = progressObj.videos.find((elem) => elem.videoID.toString() == video._id.toString()).progressPercent;
  // }

  return res.status(200).json({ progress });

};


/**
 * Checks if a video exists in the progress of a user
 * @param {Types.ObjectId} videoId Video ID
 * @param {LearningProgress} progress Progress object for the user
 * @return {Boolean}
 */
const checkIfVideoExists = (videoId: Types.ObjectId, progress: LearningProgress) => {

  for (let i = 0; i < progress.videos.length; i++)
    if (progress.videos[i].videoID !== videoId)
      return true;
  return false;
}

// // eslint-disable-next-line require-jsdoc
// const checkIfUnitExists = (unitId: Types.ObjectId, progress: LearningProgress) => {

//   for (let i = 0; i < progress.units.length; i++)
//     if (progress.units[i].unitID !== unitId)
//       return true;
//   return false;
// }

// // eslint-disable-next-line require-jsdoc
// const checkIfCourseExists = (courseId: Types.ObjectId, progress: LearningProgress) => {

//   for (let i = 0; i < progress.courses.length; i++)
//     if (progress.courses[i].courseID !== courseId)
//       return true;
//   return false;
// }

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

  const progressPercentageCurrent: number = parseFloat(req.query.videoProgressPercent.toString());
  const user = await modelUser.findOne({ userID: req.query.userID });
  if (!user) return res.status(404).json({message: 'user not found'});

  const video = await modelVideo.findOne({ videoId: req.query.videoID });
  if (!video) return res.status(404).json({message: 'video not found'});

  const progress = await modelProgress.findOne({
    userID: user._id
  });
  if (!progress) return res.status(400).send({message: 'user progress not found'})

  if (checkIfVideoExists(video._id, progress)) {
    const progressObj = progress.toObject();
    const updatedObject = new modelProgress({...progressObj, videos: progressObj.videos.map((elem) => {
      if (elem.videoID.toString() != video._id.toString())
        return elem;
      elem.progressPercent = progressPercentageCurrent;
      return elem;
    })});

    const newObj = await modelProgress.updateOne({userID: user._id}, updatedObject);
    return res.send(newObj);
  }

  const newProgressVideo: VideoProgress = {
    videoID: video._id,
    progressPercent: progressPercentageCurrent
  }
  const updatedObject = {...progress, videos: [...progress.videos, newProgressVideo], courses: []}

  const newObj = await modelProgress.updateOne({userID: user.id}, updatedObject);
  return res.send(200).json(newObj)
};