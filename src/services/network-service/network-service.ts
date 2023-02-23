import { Network } from "../../protocols/network-protocols.js";
import networkRepository from "../../repositories/network-repository.js";
import siginInRepository from "../../repositories/signIn-repository.js";
import networkErrors from "./errors.js";

async function createNetworkService(network: Network) {
   
  await networkRepository.createNetwork(network);
}

async function findByUserId (network: Network){
  const userExists = await siginInRepository.validateUserExistsId(
   network
  );
  
  if (!userExists) {
    throw networkErrors.userDoesNotExist();
  }
  const allNetworks = await networkRepository.findAllNetworksByUser(userExists.id);

 return allNetworks;
 }
 
 async function findByNetworkId(userId: number, networkId){
   
   const networkById = await networkRepository.findIdNetworksByUser(userId, networkId)
 if(!networkById){
   throw new Error("Esse id não existe")
 };
 return networkById;
 }
 
 export async function deleteNetworkById(userId: number, networkId) {
   const network = await networkRepository.findIdNetworksByUser(userId, networkId)
   if (!network) {
     throw new Error();
   }
   
   await networkRepository.deleteNetworkId(network.id);
 }

const networkService = {
  createNetworkService, findByUserId, findByNetworkId, deleteNetworkById
};

export default networkService;