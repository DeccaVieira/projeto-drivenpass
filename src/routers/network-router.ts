import { Router } from "express";
import { validationSchema } from "../middlewares/schemaValidation"
import networkSchema from "../schemas/network-schemas";
import networkController from "../controllers/network-controller";
import tokenAuthentication from "../middlewares/authentication-middleware"


const networkRouter = Router();

networkRouter.post("/networks", tokenAuthentication ,validationSchema(networkSchema, 422), networkController.createNetwork);
networkRouter.get("/networks", tokenAuthentication, networkController.GetAllNetworks);
networkRouter.get("/networks/:id", tokenAuthentication, networkController.getNetworkById);
networkRouter.delete("/networks/:id",tokenAuthentication, networkController.deleteNetworkId);
export default networkRouter;