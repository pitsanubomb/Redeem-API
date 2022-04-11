import { PrismaClient, Role } from '@prisma/client';
import { UpdateUser, User } from './interfaces/user.interface';

const prisma = new PrismaClient();
const userRepo = prisma.user;

// Create USER
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

// GET USER
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
}): Promise<
  { user: { id: string; email: string; role: Role } } | undefined
> => {
  const email = body.email;
  const query = {
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      password: true,
      role: true,
    },
  };
  const user: {
    id: string;
    email: string;
    password: string;
    role: Role;
  } | null = await userRepo.findUnique(query);
  if (user)
    return { user: { id: user.id, email: user.email, role: user.role } };
  throw new Error('Not found User');
};

// Update user
export const updateUser = async (
  id: string,
  body: UpdateUser
): Promise<User> => {
  const updateQuery = {
    where: { id },
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
    data: body,
  };
  return userRepo.update(updateQuery);
};

// Delete user
export const delUser = async (id: string): Promise<void> => {
  await userRepo.delete({ where: { id } });
};

export const addPoint = async (id: string, point: number): Promise<User> => {
  const user = await userRepo.findUnique({ where: { id: id } });
  if (!user) throw new Error('Not found User');
  point += user.point;
  const updateQuery = {
    where: { id },
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
    data: { point: point },
  };
  return userRepo.update(updateQuery);
};

export const addCash = async (id: string, cash: number): Promise<User> => {
  const user = await userRepo.findUnique({ where: { id: id } });
  if (!user) throw new Error('Not found User');
  cash += user.cash;
  const updateQuery = {
    where: { id },
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
    data: { cash: cash },
  };
  return userRepo.update(updateQuery);
};

export const minusPoint = async (id: string, point: number): Promise<User> => {
  const user = await userRepo.findUnique({ where: { id: id } });
  if (!user) throw new Error('Not found User');
  user.point -= point;
  const updateQuery = {
    where: { id },
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
    data: { point: point },
  };
  return userRepo.update(updateQuery);
};

export const minusCash = async (id: string, cash: number): Promise<User> => {
  const user = await userRepo.findUnique({ where: { id: id } });
  if (!user) throw new Error('Not found User');
  user.cash -= cash;
  const updateQuery = {
    where: { id },
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
    data: { cash: cash },
  };
  return userRepo.update(updateQuery);
};
