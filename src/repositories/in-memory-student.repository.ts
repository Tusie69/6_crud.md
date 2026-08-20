
import { Student } from '../models/student.model';
import { StudentRepositoryInterface } from '../repositories/student.repository.interface';

export class StudentService {
  constructor(private studentRepository: StudentRepositoryInterface) {}

  public async createStudent(studentData: Student): Promise<Student> {
    const existingStudent = await this.studentRepository.findByEmail(studentData.email);
    if (existingStudent) {
      throw new Error('Email này đã tồn tại trong hệ thống!');
    }

    const normalizedStudent = new Student(
      studentData.rollNumber.trim().toUpperCase(),
      studentData.email.trim().toLowerCase(),
      studentData.fullName.trim(),
      studentData.phone.trim()
    );

    return await this.studentRepository.create(normalizedStudent);
  }

  public async getAllStudents(): Promise<Student[]> {
    return await this.studentRepository.findAll();
  }
}
