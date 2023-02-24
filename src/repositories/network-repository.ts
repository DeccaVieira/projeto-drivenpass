import prisma from "../config/database";
import { Network } from "../protocols/network-protocols";

async function createNetwork(network: Network) {
  return prisma.network.create({
    data: network,
  });
}

async function findAllNetworksByUser(userId: number) {
  return prisma.network.findMany({
    where: { userId },
  });
}

async function findIdNetworksByUser(id: number, netId: number) {
  return prisma.network.findFirst({
    where: { userId: id, id: netId },
  });
}

async function deleteNetworkId(netId: number) {
  await prisma.network.delete({
    where: { id: netId },
  });
}


const networkRepository = {
  createNetwork, findAllNetworksByUser,
  findIdNetworksByUser, deleteNetworkId
}

export default networkRepository