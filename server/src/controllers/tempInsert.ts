import { Request, Response } from 'express';
import { connection } from 'mongoose';
import { modelProgress } from '../models/Learning/progress';

export const tempInsert = async (req: Request, res: Response) => {
  const creation = await modelProgress.create({
    userID: '648a339e532fd962517088ae',
    courses: [
      {
        courseID: '64856b038c23b6a491212eb3',
        progress: 1,
      },
    ],
    units: [
      {
        unitID: '648251863fd1687e8aa34db1',
        progress: 1,
      },
    ],
    videos: [
      {
        videoID: '648251863fd1687e8aa34daf',
        progressPercent: 95,
      },
    ],
    articles: [],
  });
  res.send(creation);
};
