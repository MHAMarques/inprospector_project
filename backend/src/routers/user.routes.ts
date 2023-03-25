import { Router } from "express";
import { newUserController, listUsersController, updateUserController, deleteUserController, getUsersController } from "../controllers/users.controller";
import validAdmMiddleware from "../middleware/validAdm.middleware";
import validEmailMiddleware from "../middleware/validEmail.middleware";
import { validIdMiddleware } from "../middleware/validId.middleware";
import validTokenMiddleware from "../middleware/validToken.middleware";
import { validUserMiddleware } from "../middleware/validUser.middleware";
import validActiveUserMiddleware from "../middleware/validActiveUser.middleware";

const userRoutes = Router();

userRoutes.post('', validEmailMiddleware, newUserController);
userRoutes.patch('/:id', validTokenMiddleware, validIdMiddleware, validUserMiddleware, validEmailMiddleware, updateUserController);
userRoutes.get('/profile', validTokenMiddleware, getUsersController);
userRoutes.get('', validTokenMiddleware, validAdmMiddleware, listUsersController);
userRoutes.delete('/:id', validTokenMiddleware, validIdMiddleware, validAdmMiddleware, deleteUserController);

export default userRoutes;
