import { Collection, Document } from 'mongodb';
import { getMongoDb } from '../config/mongo';
import { Student } from '../models/student.model';
import { StudentRepositoryInterface } from './student.repository.interface';

interface StudentDocument extends Document {
  _id: string;
  email: string;
  fullName: string;
  phone: string;
  createdAt: Date;
}

export class MongoStudentRepository implements StudentRepositoryInterface {
  private collectionName = 'students';

  private async getCollection(): Promise<Collection<StudentDocument>> {
    const db = await getMongoDb();
    return db.collection<StudentDocument>(this.collectionName);
  }

  public async create(student: Student): Promise<Student> {
    const collection = await this.getCollection();

    const newDoc: StudentDocument = {
      _id: student.rollNumber,
      email: student.email,
      fullName: student.fullName,
      phone: student.phone,
      createdAt: new Date(),
    };

    console.log(`[MongoDB Atlas] ─── Executing: db.students.insertOne({ _id: "${student.rollNumber}" })`);
    
    await collection.insertOne(newDoc);

    return student;
  }

  public async findAll(): Promise<Student[]> {
    const collection = await this.getCollection();

    console.log('[MongoDB Atlas] ─── Executing: db.students.find({})');

    const docs = await collection.find().toArray();

    return docs.map(
      (doc) => new Student(doc._id, doc.email, doc.fullName, doc.phone)
    );
  }

  public async findByEmail(email: string): Promise<Student | null> {
    const collection = await this.getCollection();

    console.log(`[MongoDB Atlas] ─── Executing: db.students.findOne({ email: "${email}" })`);

    const doc = await collection.findOne({ email: email });

    if (!doc) {
      return null;
    }

    return new Student(doc._id, doc.email, doc.fullName, doc.phone);
  }
}