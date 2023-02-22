import { Router } from "express";
import { validationSchema } from "../middlewares/schemaValidation.js"
import credentialSchema from "../schemas/credentials-schemas.js";
import credentialController from "../controllers/credential-controller.js";
import tokenAuthentication from "../middlewares/authentication-middleware.js"

const credencialRouter = Router();

credencialRouter.post("/credentials", tokenAuthentication ,validationSchema(credentialSchema, 422), credentialController.postCredential);
credencialRouter.get("/credentials", tokenAuthentication, credentialController.GetAllCredentials);
credencialRouter.get("/credentials/:id", tokenAuthentication, credentialController.getCredentialById);
credencialRouter.delete("/credentials/:id",tokenAuthentication, credentialController.deleteCredentialById)
export default credencialRouter;
