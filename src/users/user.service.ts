import { User } from "./interfaces/user.interface"

const mockUserList = [
    { id: 1, username: 'admin', password: 'p@ssw0rd', firstName: 'Admin', lastName: 'Demo' },
    { id: 2, username: 'userdev1', password: 'p@ssw0rd', firstName: 'User', lastName: 'Dev' },
]

export const findAllUsers = async (): Promise<User[]> => {
    return mockUserList
}


