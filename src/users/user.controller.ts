import { Request, Response, Router } from 'express'
import { User } from './interfaces/user.interface'
import * as UserService from './user.service'


export const UserController = Router()

// Get method
UserController.get("/", async (req: Request, res: Response) => {
    try {
        const users: User[] = await UserService.findAllUsers()
        res.status(200).send({ users: users })
    } catch (error) {
        res.status(500).send(error)
    }
})
