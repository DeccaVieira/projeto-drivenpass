import { Network } from "../../protocols/network-protocols";
import networkRepository from "../../repositories/network-repository";
import siginInRepository from "../../repositories/signIn-repository";
import networkErrors from "./errors";

async function createNetworkService(network: Network) {
 
  await networkRepository.createNetwork(network);
}

async function findByUserId(network: Network) {
  const userExists = await siginInRepository.validateUserExistsId(network);

  const allNetworks = await networkRepository.findAllNetworksByUser(
    userExists.id
  );

  return allNetworks;
}

async function findByNetworkId(userId: number, networkId: number) {

  const userExists = await siginInRepository.validateUserExistsId(userId);

  if (!userExists) {
    throw networkErrors.userDoesNotExist();
  } 

  const networkById = await networkRepository.findIdNetworksByUser(
    userId,
    networkId
  );
  if (!networkById) {
    throw networkErrors.networkDoesNotExist();
  }

  return networkById;
}

export async function deleteNetworkById(userId: number, networkId) {
 const userExists = await siginInRepository.validateUserExistsId(userId);

  if (!userExists) {
    throw networkErrors.userDoesNotExist();
  } 

  const networkById = await networkRepository.findIdNetworksByUser(
    userId,
    networkId
  );
  if (!networkById) {
    throw networkErrors.networkDoesNotExist();
  }
  

  await networkRepository.deleteNetworkId(networkById.id);
}

const networkService = {
  createNetworkService,
  findByUserId,
  findByNetworkId,
  deleteNetworkById,
};

export default networkService;
