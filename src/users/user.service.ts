import { PrismaClient } from '@prisma/client';
import { User } from './interfaces/user.interface';

const prisma = new PrismaClient();
const userRepo = prisma.user;

export const createdUser = async (body: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}) => {
  return userRepo.create({
    data: body,
  });
};

export const findAllUsers = async (): Promise<User[]> => {
  return userRepo.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      point: true,
      cash: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const findUserById = async (id: string): Promise<User | null> => {
  return userRepo.findUnique({
    where: { id: id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      point: true,
      cash: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const authUser = async (body: {
  email: string;
  password: string;
}): Promise<{ token: string } | undefined> => {
  const query = {
    where: {
      email: body.email,
    },
    select: {
      id: true,
      email: true,
      password: true,
    },
  };
  const user: { id: string; email: string; password: string } | null =
    await userRepo.findUnique(query);
  if (user && user.password) return { token: 'xxxxxx' };
};
