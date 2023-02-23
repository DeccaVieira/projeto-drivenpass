import prisma from "../../database/database.js";

async function validateUserExists(email) {
  return prisma.user.findFirst({
    where: { email: email },
  });
}

async function validateUserExistsId(id) {
  return prisma.user.findFirst({
    where: { id },
  });
} 

const siginInRepository = {
  validateUserExists, validateUserExistsId
}

export default siginInRepository;