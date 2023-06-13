import { Request, Response } from 'express';
import CourseModel from './models/course'; // Assuming you have defined a CourseModel using Mongoose

app.get('/courses/:courseId', async (req: Request, res: Response) => {
  const courseId = req.params.courseId;

  try {
    // Find the course by its ID
    const course = await CourseModel.findById(courseId);

    if (!course) {
      // If the course is not found, return a 404 status code and an error message
      return res.status(404).json({ error: 'Course not found' });
    }

    // If the course is found, return a 200 status code and the course data
    res.status(200).json(course);
  } catch (error) {
    // If an error occurs, return a 500 status code and an error message
    res.status(500).json({ error: 'Internal server error' });
  }
});
