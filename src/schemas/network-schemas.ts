import joi from "joi";

const networkSchema = joi.object({
  title: joi.string().required().min(3).max(50),
  network: joi.string().required().min(3).max(50),
  password: joi.string().required().min(6)
});

export default networkSchema;
