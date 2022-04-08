import { Request, Response, Router } from 'express';
import { User } from './interfaces/user.interface';
import * as UserService from './user.service';

export const UserController = Router();

// Get method
UserController.get('/', async (req: Request, res: Response) => {
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
  } catch (error) {}
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

// Auth method
UserController.post('/login', async (req: Request, res: Response) => {
  try {
    const resService = await UserService.authUser(req.body);
    res.status(201).send(resService);
  } catch (error) {}
});
