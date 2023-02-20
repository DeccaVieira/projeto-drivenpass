import Joi from "../node_modules/joi/lib/index";

export const createUserSchema ({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
