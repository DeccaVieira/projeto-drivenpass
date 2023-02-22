import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authentication-middleware.js";
import Cryptr from "cryptr";
import networkService from "../services/network-service.js";

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
    console.log(error);
    return res.status(409).send(error);
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
    console.log(error);
    return res.status(422).send(error);
  }
}

async function getNetworkById(req: AuthenticatedRequest, res: Response) {
  const { id } = res.locals.user;
  const networkId = req.params.id;

  const idNetwork = +networkId;
  const userId = +id;
  try {
    const networkById = await networkService.findByNetworkId(
      userId,
      idNetwork
    );

    const password = cryptr.decrypt(networkById.password);

    return res.status(200).send({ ...networkById, password });
  } catch (error) {
    console.log(error);
    return res.status(422).send(error);
  }
}
async function deleteNetworkId(
  req: AuthenticatedRequest,
  res: Response
) {
  const { id } = res.locals.user;
  const networkId = req.params.id;
  const idNetwork = +networkId;
  const userId = +id;
  try {
    await networkService.deleteNetworkById(userId, idNetwork);
    return res.send("Excluído com sucesso");
  } catch (error) {
    return res
      .status(422)
      .send({ error: error, msg: "Não foi possível excluir o wi-fi" });
  }
}

const networkController = {
  createNetwork, GetAllNetworks, getNetworkById, deleteNetworkId
}

export default networkController;