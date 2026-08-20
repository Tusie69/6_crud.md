import { Request, Response } from 'express';
import { StudentService } from '../services/student.service';
import { MySqlStudentRepository } from '../repositories/mysql-student.repository';
import { MongoStudentRepository } from '../repositories/mongo-student.repository';

export class StudentController {
  private studentService: StudentService;

  constructor() {

    const repository = new MongoStudentRepository();

    this.studentService = new StudentService(repository);
  }

  public createStudent = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { rollNumber, email, fullName, phone } = req.body;
      const newStudent = await this.studentService.createStudent({ rollNumber, email, fullName, phone });
      return res.status(201).json({ success: true, data: newStudent });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  };

  public getAllStudents = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const students = await this.studentService.getAllStudents();
      return res.status(200).json({ success: true, total: students.length, data: students });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
}