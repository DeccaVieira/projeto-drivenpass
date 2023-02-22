import { Credential} from "../protocols/credential-protocols.js";
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

async function findByCredentialId(userId: number, credentialId){
  console.log(typeof(credentialId), "idcr");
  
  const credentialById = await credentialRepository.findIdCredentialsByUser(userId, credentialId)
if(!credentialById){
  throw new Error("Esse id não existe")
};
return credentialById;
}

export async function deleteCredential(userId: number, credentialId) {
  const credential = await credentialRepository.findIdCredentialsByUser(userId, credentialId)
  if (!credential) {
    throw new Error();
  }
  console.log(credential, "aaaaa");
  
  await credentialRepository.deleteCredentialId(credential.id);
}
const credencialService = {
  createCredentialService, findByUserId, findByCredentialId,deleteCredential
};

export default credencialService;
