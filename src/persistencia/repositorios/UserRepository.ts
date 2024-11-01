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
        const [rows] = await this.connection.execute('SELECT * FROM user');
        return rows as User[];
    }

    async getUserById(id: number): Promise<User | null> {
        const [rows]: any = await this.connection.execute('SELECT * FROM user WHERE id = ?', [id]);
        if (rows.length > 0) {
            return new User(
                rows[0].id,
                rows[0].name,
                rows[0].password,
                rows[0].currency,
                rows[0].amount,
            );
        }
        return null;
    }

    async createUser(data: any): Promise<User | null> {
        const [result]: any = await this.connection.execute('INSERT INTO user (name, password, currency, amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [data.name, data.password, data.currency, data.amount]);
        return new User(result.insertId, data.name, data.password, data.currency, data.amount);
    }

    async updateUser(id: number, data: any): Promise<User | null> {
        await this.connection.execute('UPDATE user SET name=?, password=?, currency=?, amount=? WHERE id=?', [data.name, data.password, data.currency, data.amount, id]);
        return new User(id, data.name, data.password, data.currency, data.amount);
    }

    async deleteUser(id: number): Promise<boolean> {
        const [result]: any = await this.connection.execute('DELETE FROM user WHERE id=?', [id]);
        return result.affectedRows > 0;
    }
}
