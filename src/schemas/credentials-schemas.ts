import joi from "joi";

const credentialSchema = joi.object({
  title: joi.string().email().required().min(3).max(50),
  url: joi.string().uri().required().min(3).max(50),
  username: joi.string().email().required().min(3).max(50),
  password: joi.string().required().min(6),
  userId: joi.number().required()
});

export default credentialSchema;
