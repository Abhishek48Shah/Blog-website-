import joi from "joi";
export const userValidation = joi.object({
  name: joi.string().min(4).required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
});
