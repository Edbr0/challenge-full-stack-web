import { NextFunction, Request, Response } from 'express';
import { StudentService } from './student.service';
import { HttpStatus } from '../../common/http.status';
import { ApiResponse } from '../../common/app.success';
import { studentSchema } from '../../validation/student.validation';
import { ApiError } from '../../common/app.error';

export class StudentController {

    constructor(readonly studentService: StudentService) {}
    
    public async createStudent(req: Request, res: Response) {
        const data = studentSchema.parse(req.body);

        const student = await this.studentService.createStudent({ ...data, createdBy: String(req.user || 'user_not_found') });

        res.status(HttpStatus.CREATED).json(new ApiResponse('Estudante criado com sucesso!', student, HttpStatus.CREATED));
    }

    public async getAllStudents(req: Request, res: Response) {
        const students = await this.studentService.getAllStudents();

        res.status(HttpStatus.OK).json(new ApiResponse('Lista de estudantes', students, HttpStatus.OK));
    }

    public async getStudentById(req: Request, res: Response) {
        const id = Number(req.params.id);

        if (!id || isNaN(id)) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'ID inválido' });
        }

        const student = await this.studentService.getStudentById(id);

        if (!student) {
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'Estudante não encontrado' });
        }

        res.status(HttpStatus.OK).json(new ApiResponse('Estudante encontrado', student, HttpStatus.OK));
    }

    public async updateStudent(req: Request, res: Response) {
        const id = Number(req.params.id);

        if (!id || isNaN(id)) {
            return res.status(HttpStatus.BAD_REQUEST).json(new ApiError('ID inválido', HttpStatus.BAD_REQUEST));
        }
        
        const data = studentSchema.parse(req.body);

        const student = await this.studentService.updateStudent(id, { ...data, updatedBy: String(req.user || 'user_not_found') });

        res.status(HttpStatus.OK).json(new ApiResponse('Estudante atualizado com sucesso!', student, HttpStatus.OK));
    }

    public async deleteStudent(req: Request, res: Response) {
        const id = Number(req.params.id);

        const student = await this.studentService.deleteStudent(id);
        
        res.status(HttpStatus.OK).json(new ApiResponse('Estudante removido com sucesso!', student, HttpStatus.OK));
    }
}