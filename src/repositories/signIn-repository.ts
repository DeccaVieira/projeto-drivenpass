import prisma from "../../database/database.js";

async function validateUserExists(email) {
  return prisma.user.findFirst({
    where: { email: email },
  });
}

const siginInRepository = {
  validateUserExists,
}

export default siginInRepository;