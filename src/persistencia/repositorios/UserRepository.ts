import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { User } from '../models/User';

dotenv.config();

export class UserRepository {
    private connection: mysql.Pool;

    constructor() {
        this.connection = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            waitForConnections: true,
            connectionLimit: 10,
        });
    }

    async getAllUsers(): Promise<User[] | null> {
        try {
            const [rows] = await this.connection.execute('SELECT * FROM user');
            return rows as User[];
        } catch (error) {
            console.error('Error al obtener todos los usuarios:', error);
            return null; // o lanzar un error
        }
    }

    async getUserById(id: number): Promise<User | null> {
        const [rows]: any = await this.connection.execute('SELECT * FROM user WHERE id_user = ?', [id]);
        if (rows.length > 0) {
            return new User(
                rows[0].id_user,   // Cambiar id por id_user
                rows[0].name,
                rows[0].password,
                rows[0].currency,
                rows[0].amount,
            );
        }
        return null;
    }
    

    async createUser(data: any): Promise<User | null> {
        try {
            const [result]: any = await this.connection.execute(
                'INSERT INTO user (name, password, currency, amount) VALUES (?, ?, ?, ?)',
                [data.name, data.password, data.currency, data.amount]
            );
            return new User(result.insertId, data.name, data.password, data.currency, data.amount);
        } catch (error) {
            console.error('Error al crear usuario:', error);
            return null;
        }
    }

    async updateUser(id: number, data: any): Promise<User | null> {
        try {
            const [result]: any = await this.connection.execute(
                'UPDATE user SET name=?, password=?, currency=?, amount=? WHERE id_user=?',
                [data.name, data.password, data.currency, data.amount, id]
            );
            return new User(id, data.name, data.password, data.currency, data.amount);
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            return null; // o lanzar un error
        }
    }

    async deleteUser(id: number): Promise<boolean> {
        const [result]: any = await this.connection.execute('DELETE FROM user WHERE id_user=?', [id]);
        return result.affectedRows > 0;
    }
}
