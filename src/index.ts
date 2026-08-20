import express, { Application } from 'express'; 
import cors from 'cors'; 
import dotenv from 'dotenv'; 
import studentRouter from './routes/student.route'; 

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;


app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/students', studentRouter);


app.listen(PORT, () => {
  console.log(`🚀 Server đang vận hành tại: http://localhost:${PORT}`);
  console.log(`🔗 API Endpoint Sinh viên: http://localhost:${PORT}/api/v1/students`);
});