import { prisma } from '../../database/prisma';
import { Student } from './student.entity';
import { ICreateStudent, IUpdateStudent } from './student.dto';


export class StudentRepository {
    async createStudent(data: ICreateStudent): Promise<Student> {
        const student = await prisma.student.create({
            data,
        });
        return student;
    }

    async getAllStudents(): Promise<Student[]> {
        const students = await prisma.student.findMany();
        return students;
    }

    async getStudentById(id: number): Promise<Student | null> {
        const student = await prisma.student.findUnique({
            where: { id },
        });
        return student;
    }

    async getStudentByRa(ra: string): Promise<Student | null> {
        const student = await prisma.student.findUnique({
            where: { ra },
        });
        return student;
    }

    async getStudentByCpf(cpf: string): Promise<Student | null> {
        const student = await prisma.student.findFirst({
            where: { cpf },
        });
        
        return student;
    }

    async updateStudent(id: number, data: IUpdateStudent): Promise<Student> {
        const student = await prisma.student.update({
            where: { id },
            data,
        });
        return student;
    }

    async deleteStudent(id: number): Promise<Student> {
        const student = await prisma.student.delete({
            where: { id },
        });
        return student;
    }
}