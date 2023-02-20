import prisma from "../../database/database"

async function findEmail(email : string) {
  return prisma.user.findFirst({
    where: {email : email}
  })
  }

const signUpRepository = {
  findEmail
}

export default signUpRepository