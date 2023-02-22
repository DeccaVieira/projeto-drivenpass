import { Router } from "express";
import { validationSchema } from "../middlewares/schemaValidation.js"
import networkSchema from "../schemas/network-schemas.js";
import networkController from "../controllers/network-controller.js";
import tokenAuthentication from "../middlewares/authentication-middleware.js"


const networkRouter = Router();

networkRouter.post("/networks", tokenAuthentication ,validationSchema(networkSchema, 422), networkController.createNetwork);
networkRouter.get("/networks", tokenAuthentication, networkController.GetAllNetworks);
networkRouter.get("/networks/:id", tokenAuthentication, networkController.getNetworkById);
networkRouter.delete("/networks/:id",tokenAuthentication, networkController.deleteNetworkId);
export default networkRouter;