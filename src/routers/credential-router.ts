import { Router } from "express";
import { validationSchema } from "../middlewares/schemaValidation.js"
import credentialSchema from "../schemas/credentials-schemas.js";
import credentialController from "../controllers/credential-controller.js";
import tokenAuthentication from "../middlewares/authentication-middleware.js"

const credencialRouter = Router();

credencialRouter.post("/credentials", tokenAuthentication ,credentialController.postCredential);

export default credencialRouter;