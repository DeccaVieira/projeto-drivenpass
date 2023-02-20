import Joi from "../../node_modules/joi/lib/index";

const signUpSchema = Joi.object ({
  email: Joi.string().email().required().min(3).max(50),
  password: Joi.string().required().min(6),
});

export default signUpSchema;