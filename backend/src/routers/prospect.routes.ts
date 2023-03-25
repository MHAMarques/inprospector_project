import { Router } from "express";
import { newProspectController, listProspectsController, updateProspectController, deleteProspectController } from "../controllers/prospects.controller";
import validAdmMiddleware from "../middleware/validAdm.middleware";
import validEmailMiddleware from "../middleware/validEmail.middleware";
import {validProspectMiddleware} from "../middleware/validId.middleware";
import validTokenMiddleware from "../middleware/validToken.middleware";
import checkUserMiddleware from "../middleware/checkUser.middleware";
import { validUserMiddleware, validOwnerMiddleware } from "../middleware/validUser.middleware";
import validActiveUserMiddleware from "../middleware/validActiveUser.middleware";

const prospectRoutes = Router();

prospectRoutes.post('', validTokenMiddleware, newProspectController);
prospectRoutes.get('', validTokenMiddleware, checkUserMiddleware, listProspectsController);
prospectRoutes.patch('/:id', validTokenMiddleware, validProspectMiddleware, validOwnerMiddleware, updateProspectController);
prospectRoutes.delete('/:id', validTokenMiddleware, validProspectMiddleware, validOwnerMiddleware, deleteProspectController);

export default prospectRoutes;
