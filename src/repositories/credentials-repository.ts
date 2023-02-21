import prisma from "../../database/database.js";
import { Credential } from "../protocols/credential-protocols.js";

async function createCredential(credential : Credential) {
  try {
    await prisma.credential.create({
      data : credential
    })
  }catch (error) {
    throw new Error();
  }
};


const credentialRepository = {
  createCredential
}

export default credentialRepository;