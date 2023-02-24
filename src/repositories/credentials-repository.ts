import prisma from "../config/database";
import { Credential } from "../protocols/credential-protocols";

async function createCredential(credential: Credential) {
  return prisma.credential.create({
    data: credential,
  });
}
async function findTitleExists(credTitle: string, credId) {
  return prisma.credential.findFirst({
    where: { title: credTitle, userId: credId },
  });
}

async function findAllCredentialsByUser(credId: number) {
  return prisma.credential.findMany({
    where: { userId: credId },
  });
}

async function findIdCredentialsByUser(id: number, credId: number) {
  return prisma.credential.findFirst({
    where: { userId: id, id: credId },
  });
}

async function deleteCredentialId(credId: number) {
  await prisma.credential.delete({
    where: { id: credId },
  });
}

const credentialRepository = {
  createCredential,
  findTitleExists,
  findAllCredentialsByUser,
  findIdCredentialsByUser,
  deleteCredentialId
};

export default credentialRepository;
