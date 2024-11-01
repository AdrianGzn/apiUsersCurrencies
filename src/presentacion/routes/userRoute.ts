import express, { Router } from 'express';
import { UserController } from '../controllers/userController';
import { UserService } from '../../noticia/services/userService';
import { UserRepository } from '../../persistencia/repositorios/UserRepository';

export const userRoutes: Router = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRoutes.get("/", userController.getAll.bind(userController));
userRoutes.get("/:id", userController.getById.bind(userController));
userRoutes.post("/post", userController.create.bind(userController));
userRoutes.put("/:id", userController.update.bind(userController));
userRoutes.delete("/:id", userController.delete.bind(userController));
