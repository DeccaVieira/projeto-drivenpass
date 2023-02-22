import prisma from "../../database/database.js";
import { Credential } from "../protocols/credential-protocols.js";

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

async function findAllCredentialsByUser(credId : number) {
  return prisma.credential.findMany({
    where: { userId: credId },
  });
}

async function findIdCredentialsByUser(credId : number, id: number) {
  return prisma.credential.findMany({
    where: { id, userId: credId },
  });
}

const credentialRepository = {
  createCredential,
  findTitleExists,
  findAllCredentialsByUser,
  findIdCredentialsByUser,
};

export default credentialRepository;
