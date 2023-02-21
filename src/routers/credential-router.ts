import { Router } from "express";
import { validationSchema } from "../middlewares/schemaValidation.js"
import credentialSchema from "../schemas/credentials-schemas.js";

const credencialRouter = Router();

credencialRouter.post("/credentials");

export default credencialRouter;
