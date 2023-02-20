import { User } from "../protocols/signUp-protocols";
import signUpRepository from "../repositories/signUp-repository.js";

async function createUser(email, hashPassword) {
  await signUpRepository.createUser(email, hashPassword)
}

const signUpService = {
  createUser
};

export default signUpService;
