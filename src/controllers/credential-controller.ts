import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authentication-middleware.js";
import credencialService from "../services/credential-service.js";
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
  console.log(credential);

  try {
    await credencialService.createCredentialService(credential);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(409).send(error);
  }
}

async function GetAllCredentials(req: AuthenticatedRequest, res: Response) {
  const { id } = res.locals.user;

  try {
    const credentials = await credencialService.findByUserId(id);
    console.log(credentials, "cred");

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

const credentialController = {
  postCredential,
  GetAllCredentials,
};

export default credentialController;
