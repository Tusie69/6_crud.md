import { Request, Response } from 'express';
import { StudentService } from '../services/student.service';

export class StudentController {
  private studentService: StudentService;

  constructor() {
    this.studentService = new StudentService();
  }

  public createStudent = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { rollNumber, email, fullName, phone } = req.body;

      if (!rollNumber || !email || !fullName || !phone) {
        return res.status(400).json({
          success: false,
          message: 'Vui lòng điền đầy đủ thông tin: rollNumber, email, fullName, phone.',
        });
      }

      const newStudent = await this.studentService.createStudent({
        rollNumber,
        email,
        fullName,
        phone,
      });

      return res.status(201).json({
        success: true,
        message: 'Tạo sinh viên mới thành công!',
        data: newStudent,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message || 'Có lỗi xảy ra khi tạo sinh viên.',
      });
    }
  };

  public getAllStudents = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const students = await this.studentService.getAllStudents();

      return res.status(200).json({
        success: true,
        total: students.length,
        data: students,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi hệ thống khi lấy danh sách sinh viên.',
      });
    }
  };
}
