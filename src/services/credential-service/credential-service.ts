import { Credential } from "../../protocols/credential-protocols";
import credentialRepository from "../../repositories/credentials-repository";
import credentialErrors from "./errors";
import siginInRepository from "../../repositories/signIn-repository";

async function createCredentialService(credential: Credential) {
  const titleVerify = await credentialRepository.findTitleExists(
    credential.title,
    credential.userId
  );
  const userExists = await siginInRepository.validateUserExistsId(
    credential.userId
  );
  if (!userExists) {
    throw credentialErrors.userDoesNotExist();
  }
  if (titleVerify) {
    throw credentialErrors.titleAlreadyExist();
  }

  await credentialRepository.createCredential(credential);
}

async function findByUserId(credential: Credential) {
  const userExists = await siginInRepository.validateUserExistsId(credential);
  if (!userExists) {
    throw credentialErrors.userDoesNotExist();
  }

  const allCredentials = await credentialRepository.findAllCredentialsByUser(
    userExists.id
  );

  return allCredentials;
}

async function findByCredentialId(userId: number, credentialId) {
  const userExists = await siginInRepository.validateUserExistsId(userId);
  if (!userExists) {
    throw credentialErrors.userDoesNotExist();
  }
  const credentialById = await credentialRepository.findIdCredentialsByUser(
    userExists.id,
    credentialId
  );

  if (!credentialById) {
    throw credentialErrors.credentialDoesNotExist();
  }
  return credentialById;
}

export async function deleteCredential(userId: number, credentialId) {
  const userExists = await siginInRepository.validateUserExistsId(userId);
  if (!userExists) {
    throw credentialErrors.userDoesNotExist();
  }
  const credentialById = await credentialRepository.findIdCredentialsByUser(
    userExists.id,
    credentialId
  );

  if (!credentialById) {
    throw credentialErrors.credentialDoesNotExist();
  }
  await credentialRepository.deleteCredentialId(credentialById.id);
}
const credencialService = {
  createCredentialService,
  findByUserId,
  findByCredentialId,
  deleteCredential,
};

export default credencialService;
