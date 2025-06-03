import { StudentService } from './student.service';
import { StudentRepository } from './student.repository';
import { ApiError } from '../../common/app.error';
import { IUpdateStudent } from './student.dto';
import { Student } from './student.entity';


describe('StudentService - updateStudent', () => {
    let studentRepository: jest.Mocked<StudentRepository>;
    let studentService: StudentService;

    const existingStudent: Student = {
        id: 1,
        name: 'Estudante Teste',
        ra: '123456',
        cpf: '11122233344',
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        email: 'estudante@teste.com',
        createdBy: 'joao.silva',
        updatedBy: 'joao.silva'
    };

    beforeEach(() => {
        studentRepository = {
            getStudentById: jest.fn(),
            updateStudent: jest.fn(),
        } as any;
        studentService = new StudentService(studentRepository);
    });

    it('Deve atualizar o estudante se RA e CPF não foram editados', async () => {
        const updateData: IUpdateStudent = {
            name: 'Estudante Teste Atualizado',
            ra: existingStudent.ra,
            cpf: existingStudent.cpf,
            email: 'estudante@teste.com',
            updatedBy: 'joao.silva'
        };

        studentRepository.getStudentById.mockResolvedValue(existingStudent);
        studentRepository.updateStudent.mockResolvedValue({
            ...existingStudent,
            ...updateData,
        });

        const result = await studentService.updateStudent(existingStudent.id, updateData);

        expect(studentRepository.getStudentById).toHaveBeenCalledWith(existingStudent.id);
        expect(studentRepository.updateStudent).toHaveBeenCalledWith(existingStudent.id, updateData);
        expect(result.name).toBe('Estudante Teste Atualizado');
    });

    it('Deve retornar caso não encontrado estudante', async () => {
        studentRepository.getStudentById.mockResolvedValue(null);

        const updateData: IUpdateStudent = {
            name: 'Any',
            ra: '123456',
            cpf: '11122233344',
            email: 'estudante@teste.com',
            updatedBy: 'joao.silva'
        };

        await expect(studentService.updateStudent(99, updateData))
            .rejects
            .toThrowError(new ApiError('Estudante não encontrado', 404));
    });

    it('Deve retornar 400 caso tentem editar RA', async () => {
        studentRepository.getStudentById.mockResolvedValue(existingStudent);

        const updateData: IUpdateStudent = {
            name: 'Estudante Teste Atualizado',
            ra: '654321', // different RA
            cpf: existingStudent.cpf,
            email: 'estudante@teste.com',
            updatedBy: 'joao.silva'
        };

        await expect(studentService.updateStudent(existingStudent.id, updateData))
            .rejects
            .toThrowError(new ApiError('RA não é um campo editável', 400));
    });

    it('Deve retornar 400 caso tentem editar CPF', async () => {
        studentRepository.getStudentById.mockResolvedValue(existingStudent);

        const updateData: IUpdateStudent = {
            name: 'Estudante Teste Atualizado',
            ra: existingStudent.ra,
            cpf: '99988877766',
            email: 'estudante@teste.com',
            updatedBy: 'joao.silva'
        };

        await expect(studentService.updateStudent(existingStudent.id, updateData))
            .rejects
            .toThrowError(new ApiError('CPF não é um campo editável', 400));
    });
});



describe('StudentService - CRUD', () => {
    let studentRepository: jest.Mocked<StudentRepository>;
    let studentService: StudentService;

    const newStudentData = {
        name: 'Novo Estudante',
        ra: '999999',
        cpf: '12312312399',
        email: 'novo@teste.com',
        createdBy: 'admin'
    };

    const createdStudent: Student = {
        id: 2,
        name: 'Novo Estudante',
        ra: '999999',
        cpf: '12312312399',
        email: 'novo@teste.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        createdBy: 'admin',
        updatedBy: 'admin'
    };

    beforeEach(() => {
        studentRepository = {
            createStudent: jest.fn(),
            getAllStudents: jest.fn(),
            deleteStudent: jest.fn(),
            getStudentByRa: jest.fn(),
            getStudentByCpf: jest.fn(),
            getStudentById: jest.fn(),
            updateStudent: jest.fn(),
        } as any;
        studentService = new StudentService(studentRepository);
    });

    it('Deve criar um novo estudante', async () => {
        studentRepository.getStudentByRa.mockResolvedValue(null);
        studentRepository.getStudentByCpf.mockResolvedValue(null);
        studentRepository.createStudent.mockResolvedValue(createdStudent);

        const result = await studentService.createStudent(newStudentData);

        expect(studentRepository.getStudentByRa).toHaveBeenCalledWith(newStudentData.ra);
        expect(studentRepository.getStudentByCpf).toHaveBeenCalledWith(newStudentData.cpf);
        expect(studentRepository.createStudent).toHaveBeenCalledWith(newStudentData);
        expect(result).toEqual(createdStudent);
    });

    it('Deve listar todos os estudantes', async () => {
        studentRepository.getAllStudents.mockResolvedValue([createdStudent]);

        const result = await studentService.getAllStudents();

        expect(studentRepository.getAllStudents).toHaveBeenCalled();
        expect(result).toEqual([createdStudent]);
    });

    it('Deve deletar um estudante', async () => {
        studentRepository.deleteStudent.mockResolvedValue(createdStudent);

        const result = await studentService.deleteStudent(createdStudent.id);

        expect(studentRepository.deleteStudent).toHaveBeenCalledWith(createdStudent.id);
        expect(result).toEqual(createdStudent);
    });
});