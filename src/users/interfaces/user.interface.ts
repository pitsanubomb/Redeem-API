export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  point: number;
  cash: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
