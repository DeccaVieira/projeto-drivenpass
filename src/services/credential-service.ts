import { Credential } from "../protocols/credential-protocols.js";
import credentialRepository from "../repositories/credentials-repository.js";

async function createCredentialService(credential : Credential) {
  await credentialRepository.createCredential(credential);
}

const credencialService = {
  createCredentialService
}

export default credencialService;