import { User } from "../protocols/signUp-protocols";
import signUpRepository from "../repositories/signUp-repository.js";

async function createUser(email, hashPassword) {
  if (!email || !hashPassword) {
    throw new Error();
  }
  const userExists = await signUpRepository.findEmail(email);
  if (userExists) {
    throw new Error();
  }
  await signUpRepository.createUser(email, hashPassword);
}

const signUpService = {
  createUser,
};

export default signUpService;
