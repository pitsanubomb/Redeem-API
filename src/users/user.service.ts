import { User } from "./interfaces/user.interface"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const userRepo = prisma.user

export const findAllUsers = async (): Promise<any> => {
    return userRepo.findMany()
}


