import Joi from "../../node_modules/joi/lib/index.js";
import { Users } from "../protocols/signUp-protocols.js";

const signUpSchema = Joi.object <Users>({
  email: Joi.string().email().required().min(3).max(50),
  password: Joi.string().required().min(10),
  confirmPassword: Joi.ref("password")
});

export default signUpSchema;
