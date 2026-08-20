import dbPool from '../config/database';
import { Student } from '../models/student.model';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export class StudentRepository {
  public async create(student: Student): Promise<Student> {
    const sql = `
      INSERT INTO students (roll_number, email, full_name, phone)
      VALUES (?, ?, ?, ?)
    `;

    const values = [student.rollNumber, student.email, student.fullName, student.phone];
    await dbPool.execute<ResultSetHeader>(sql, values);

    return student;
  }

  public async findAll(): Promise<Student[]> {
    const sql = `SELECT roll_number AS rollNumber, email, full_name AS fullName, phone FROM students`;
    const [rows] = await dbPool.query<RowDataPacket[]>(sql);

    return rows as Student[];
  }

  public async findByEmail(email: string): Promise<Student | null> {
    const sql = `SELECT roll_number AS rollNumber, email, full_name AS fullName, phone FROM students WHERE email = ?`;
    const [rows] = await dbPool.query<RowDataPacket[]>(sql, [email]);

    if (rows.length === 0) {
      return null;
    }

    return rows[0] as Student;
  }
}
