import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { NextFunction } from 'express';
import { Response } from 'express';
import { Request } from 'express';

const prisma = new PrismaClient();

const reqAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authToken = req.header('authorization')?.replace(/^Bearer\s/, '');
  if (!authToken) res.status(401).send({ message: 'Unauthorization' });
  else {
    try {
      jwt.verify(authToken, 'secret@pass');
    } catch (error) {
      const tokenRes: any = await refreshToken(req.header('x-refresh'));
      if (tokenRes === 'Error')
        res.status(401).send({ message: 'Unauthorization' });
      else {
        res.setHeader('x-auth', tokenRes.token);
      }
    }
    const decode = jwt.decode(authToken);
    if (decode)
      // @ts-ignore
      req.user = decode;
    next();
  }
};

const refreshToken = async (
  refresh: string | undefined
): Promise<{ token: string; refresh: string } | string> => {
  if (refresh === undefined) return 'Error';
  else {
    const decode: any = jwt.decode(refresh);
    const user = await prisma.user.findUnique({ where: { id: decode.id } });
    if (user) {
      const tokenBody = {
        id: user.id,
        email: user.email,
        role: user.role,
      };
      const token = jwt.sign(tokenBody, 'secret@pass', { expiresIn: 120 });
      const refresh = jwt.sign(tokenBody, 'secrete@pass', { expiresIn: '1y' });
      return { token: token, refresh: refresh };
    }
    return 'Error';
  }
};

export default reqAuth;
