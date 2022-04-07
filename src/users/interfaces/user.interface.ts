export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    point: number;
    cash: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
