import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authentication-middleware.js";
import credentialService from "../services/credential-service.js";
import Cryptr from "cryptr";

const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

async function postCredential(req: AuthenticatedRequest, res: Response) {
  const { title, url, username, password } = req.body;
  const { email, id } = res.locals.user;
  const encryptedString = cryptr.encrypt(password);
  const credential = {
    title,
    url,
    username,
    password: encryptedString,
    userId: id,
  };
 
  try {
    await credentialService.createCredentialService(credential);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(409).send(error);
  }
}



async function GetAllCredentials(req: AuthenticatedRequest, res: Response) {
  const { id } = res.locals.user;

  try {
    const credentials = await credentialService.findByUserId(id);
    const decrypted = credentials.map((c) => {
      const password = cryptr.decrypt(c.password);
      return { ...c, password };
    });
    return res.status(200).send(decrypted);
  } catch (error) {
    console.log(error);
    return res.status(422).send(error);
  }
}

async function getCredentialById(req: AuthenticatedRequest, res: Response) {
  const { id } = res.locals.user;
  const credentialId = req.params.id;

  const idCredential = +credentialId;
  const userId = +id;
  try {
    const credentialById = await credentialService.findByCredentialId(
      userId,
      idCredential
    );

    const password = cryptr.decrypt(credentialById.password);

    return res.status(200).send({ ...credentialById, password });
  } catch (error) {
    console.log(error);
    return res.status(422).send(error);
  }
}
export async function deleteCredentialById(
  req: AuthenticatedRequest,
  res: Response
) {
  const { id } = res.locals.user;
  const credentialId = req.params.id;
  const idCredential = +credentialId;
  const userId = +id;
  try {
    await credentialService.deleteCredential(userId, idCredential);
    return res.send("Excluído com sucesso");
  } catch (error) {
    return res
      .status(422)
      .send({ error: error, msg: "Não foi possível excluir a credencial" });
  }
}

const credentialController = {
  postCredential,
  GetAllCredentials,
  getCredentialById,
  deleteCredentialById,
};

export default credentialController;
