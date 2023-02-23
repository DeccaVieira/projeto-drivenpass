import prisma from "../../config/database.js";

async function findEmail(email: string) {
  return prisma.user.findFirst({
    where: { email: email },
  });
}

async function createUser(email, hashPassword) {
  return prisma.user.create({
    data: {
      email: email,
      password: hashPassword,
    },
  });
}

const signUpRepository = {
  findEmail,
  createUser,
};

export default signUpRepository;
