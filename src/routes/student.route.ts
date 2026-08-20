import { Router } from 'express';
import { StudentController } from '../controllers/student.controller';

const studentRouter = Router();
const studentController = new StudentController();

studentRouter
  .route('/')
  .post(studentController.createStudent)
  .get(studentController.getAllStudents);

export default studentRouter;
