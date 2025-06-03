import { ApiError } from '../../common/app.error';
import { ICreateStudent, IUpdateStudent } from './student.dto';
import { Student } from './student.entity';
import { StudentRepository } from './student.repository';




export class StudentService {
    constructor(readonly studentRepository: StudentRepository) {}
    async createStudent(data: ICreateStudent): Promise<Student> {

        const { ra, cpf } = data;

        const existingStudentRa = await this.studentRepository.getStudentByRa(ra);

        if (existingStudentRa) {
            throw new ApiError('Estudante com RA já cadastrado', 400);
        }

        const existingStudentCpf= await this.studentRepository.getStudentByCpf(cpf);

        if (existingStudentCpf) {
            throw new ApiError('Estudante com CPF já cadastrado', 400);
        }

        const student = await this.studentRepository.createStudent(data);
        return student;
    }

    async getAllStudents(): Promise<Student[]> {
        const students = await this.studentRepository.getAllStudents();
        return students;
    }

    async getStudentById(id: number): Promise<Student | null> {
        const student = await this.studentRepository.getStudentById(id);
        return student;
    }

    async updateStudent(id: number, data: IUpdateStudent): Promise<Student> {

        const existingStudent = await this.studentRepository.getStudentById(id);

        if (!existingStudent) { 
            throw new ApiError('Estudante não encontrado', 404);
        }
        const { ra, cpf } = data;

        if (ra !== existingStudent.ra) {
            throw new ApiError('RA não é um campo editável', 400);
        }

        if (cpf !== existingStudent.cpf) {
            throw new ApiError('CPF não é um campo editável', 400);
        }

        const student = await this.studentRepository.updateStudent(id, data);
        return student;
    }

    async deleteStudent(id: number): Promise<Student> {
        const student = await this.studentRepository.deleteStudent(id);
        return student;
    }
}