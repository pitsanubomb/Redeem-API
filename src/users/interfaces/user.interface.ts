import { Role } from '@prisma/client';
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  point: number;
  cash: number;
  isActive: boolean;
  // createdAt: string;
  // updatedAt: string;
}

export interface UpdateUser {
  firstName?: string;
  lastName?: string;
  point?: number;
  cash?: number;
  isAcive?: boolean;
  avatarUrl?: string;
  role?: Role;
}
