import Joi from "../../node_modules/joi/lib/index.js";

const signUpSchema = Joi.object ({
  email: Joi.string().email().required().min(3).max(50),
  password: Joi.string().required().min(6),
  confirmPassword: Joi.ref("password")
});

export default signUpSchema;