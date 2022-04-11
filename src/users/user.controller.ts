import jwt from 'jsonwebtoken';
import { Request, Response, Router } from 'express';
import { User } from './interfaces/user.interface';
import * as UserService from './user.service';
import reqAuth from '../middleware/reqAuth.middleware';

export const UserController = Router();

// Get method
UserController.get('/', reqAuth, async (req: Request, res: Response) => {
  try {
    const users: User[] = await UserService.findAllUsers();
    res.status(200).send({ users: users });
  } catch (error) {
    res.status(500).send(error);
  }
});

UserController.get('/:userId', async (req: Request, res: Response) => {
  try {
    const user: User | null = await UserService.findUserById(req.params.userId);
    res.send({ user: user });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Post method
UserController.post('/', async (req: Request, res: Response) => {
  try {
    await UserService.createdUser(req.body);
    res.status(201).send({ message: 'Add users success' });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Path method
UserController.patch('/:userId', async (req: Request, res: Response) => {
  try {
    await UserService.updateUser(req.params.userId, req.body);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Auth method
UserController.post('/login', async (req: Request, res: Response) => {
  try {
    const resService = await UserService.authUser(req.body);
    if (resService) {
      const tokenBody = {
        id: resService.user.id,
        email: resService.user.email,
        role: resService.user.role,
      };

      const token = jwt.sign(tokenBody, 'secret@pass', { expiresIn: '1d' });
      // const refresh = jwt.sign(tokenBody, 'secrete@pass', { expiresIn: '1y' });
      res.status(201).send({ user: resService.user, token: token });
    } else {
      res.status(401).send({ message: 'Not have user' });
    }
  } catch (error) {}
});
