import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authentication-middleware";
import Cryptr from "cryptr";
import networkService from "../services/network-service/network-service";
import {ModelError} from "../protocols/error-protocol"
const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

async function createNetwork(req: AuthenticatedRequest, res: Response) {
  const { title, network, password } = req.body;
  const { id } = res.locals.user;
  const encryptedString = cryptr.encrypt(password);
  const networks = {
    title,
    network,
    password: encryptedString,
    userId: id,
  };

  try {
    await networkService.createNetworkService(networks);
    console.log(networks);

    return res.sendStatus(200);
  } catch (error) {
    if (error.name === "userDoesNotExist") {
      return res.status(error.code).send(error.message);
    }
  }
}

async function GetAllNetworks(req: AuthenticatedRequest, res: Response) {
  const { id } = res.locals.user;

  try {
    const networks = await networkService.findByUserId(id);
    const decrypted = networks.map((n) => {
      const password = cryptr.decrypt(n.password);
      return { ...n, password };
    });
    return res.status(200).send(decrypted);
  } catch (error) {
    if (error.name === "userDoesNotExist") {
      return res.status(error.code).send(error.message);
    }
  }
}

async function getNetworkById(req: AuthenticatedRequest, res: Response) {
  const { id } = res.locals.user;
  const networkId = req.params.id;

  const idNetwork = +networkId;
  const userId = +id;
  try {
    const networkById = await networkService.findByNetworkId(userId, idNetwork);

    const password = cryptr.decrypt(networkById.password);

    return res.status(200).send({ ...networkById, password });
  } catch (error) {
    if (error.name === "userDoesNotExist") {
      return res.status(error.code).send(error.message);
    }
    if (error.name === "networkDoesNotExist") {
      return res.status(error.code).send(error.message);
    }
  }
}
async function deleteNetworkId(req: AuthenticatedRequest, res: Response) {
  const { id } = res.locals.user;
  const networkId = req.params.id;
  const idNetwork = +networkId;
  const userId = +id;
  try {
    await networkService.deleteNetworkById(userId, idNetwork);
    return res.status(200).send("Excluído com sucesso");
  } catch (error) {
    if (error.name === "userDoesNotExist") {
      return res.status(error.code).send(error.message);
    }
    if (error.name === "networkDoesNotExist") {
      return res.status(error.code).send(error.message);
    }
  }
}

const networkController = {
  createNetwork,
  GetAllNetworks,
  getNetworkById,
  deleteNetworkId,
};

export default networkController;
