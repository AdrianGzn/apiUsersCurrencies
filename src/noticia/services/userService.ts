import { UserRepository } from '../../persistencia/repositorios/UserRepository';
import { User } from '../../persistencia/models/User';

export class UserService {
    constructor(private readonly userRepositorio: UserRepository) {}

    async getAllUsers(): Promise<User[] | null> {
        return this.userRepositorio.getAllUsers();
    }

    async getUserById(id: number): Promise<User | null> {
        return this.userRepositorio.getUserById(id);
    }

    async createUser(data: any): Promise<User | null> {
        return this.userRepositorio.createUser(data);
    }

    async updateUser(id: number, data: any): Promise<User | null> {
        return this.userRepositorio.updateUser(id, data);
    }

    async deleteUser(id: number): Promise<boolean> {
        return this.userRepositorio.deleteUser(id);
    }
}
