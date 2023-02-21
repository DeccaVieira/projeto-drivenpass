import { number } from "joi";
import { Credential } from "../protocols/credential-protocols.js";
import credentialRepository from "../repositories/credentials-repository.js";

async function createCredentialService(credential: Credential) {


  const titleVerify = await credentialRepository.findTitleExists(
    credential.title , credential.userId
);
if(titleVerify) {
  throw new Error();
}
  
  await credentialRepository.createCredential(credential);
}

async function findByUserId (credential: Credential){
 const allCredentials = await credentialRepository.findAllCredentialsByUser(credential.userId);
if(!allCredentials){
  throw new Error()
};
return allCredentials;
}

const credencialService = {
  createCredentialService,findByUserId
};

export default credencialService;
