import { Request, Response, Router } from 'express'
import * as UserService from './user.service'


export const UserController = Router()

// Get method
UserController.get("/", async (req: Request, res: Response) => {
    try {
        const users = await UserService.findAllUsers()
        res.status(200).send({ users: users })
    } catch (error) {
        res.status(500).send(error)
    }
})
