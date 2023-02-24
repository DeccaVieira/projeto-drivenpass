import { Router } from "express";
import { validationSchema } from "../middlewares/schemaValidation"
import credentialSchema from "../schemas/credentials-schemas";
import credentialController from "../controllers/credential-controller";
import tokenAuthentication from "../middlewares/authentication-middleware"

const credencialRouter = Router();

credencialRouter.post("/credentials", tokenAuthentication ,validationSchema(credentialSchema, 422), credentialController.postCredential);
credencialRouter.get("/credentials", tokenAuthentication, credentialController.GetAllCredentials);
credencialRouter.get("/credentials/:id", tokenAuthentication, credentialController.getCredentialById);
credencialRouter.delete("/credentials/:id",tokenAuthentication, credentialController.deleteCredentialById)
export default credencialRouter;
