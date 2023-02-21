import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import prisma from "../../database/database.js";

async function tokenAuthentication(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.header("Authorization");
  if (!authHeader) return UnauthorizedResponse(res);

  const token = authHeader.split(" ")[1];
  if (!token) return UnauthorizedResponse(res);

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTUser;
console.log({userId}, "userId");

    // const session = await prisma.session.findFirst({
    //   where: {
    //     token,
    //   },
    // });
    // if (!session) return UnauthorizedResponse(res);

    req.userId = userId;
    console.log(req.userId, "id");
    
    return next();
  } catch (err) {
    return UnauthorizedResponse(res);
  }
}

function UnauthorizedResponse(res: Response) {
  res.status(422).send("Transação não autorizada!");
}

export type AuthenticatedRequest = Request & JWTUser;

type JWTUser = {
  userId: number;
};
