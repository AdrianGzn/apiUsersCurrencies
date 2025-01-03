import { Request, Response } from 'express';
import { UserService } from '../../noticia/services/userService';

export class UserController {
    constructor(private readonly userService: UserService) {}

    async getAll(req: Request, res: Response) {
        const users = await this.userService.getAllUsers();
        res.status(200).send({ status: true, data: users });
    }

    async getById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const user = await this.userService.getUserById(id);
        res.status(200).send({ status: 'OK', data: user });
    }

    async create(req: Request, res: Response) {
        const data = req.body;
        const newUser = await this.userService.createUser(data);
        if (newUser) {
            res.status(201).send({ status: 'OK', data: newUser });
        } else {
            res.status(400).send({ status: 'Error', message: 'Error creating user' });
        }
    }
    

    async update(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const data = req.body;
        const updatedUser = await this.userService.updateUser(id, data);
        
        if (updatedUser) {
            res.status(200).send({ status: 'OK', data: updatedUser });
        } else {
            res.status(404).send({ status: 'Error', message: 'User not found' });
        }
    }

    async delete(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const isDeleted = await this.userService.deleteUser(id);
        res.status(200).send({ status: 'OK', data: isDeleted });
    }
}
