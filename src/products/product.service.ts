import { PrismaClient, Product, ProductType } from '@prisma/client';

const prisma = new PrismaClient();
const productRepo = prisma.product;

export interface productBody {
  productName: string;
  productType: ProductType;
  point?: number;
  price?: number;
  reward?: number;
  imageUrl: string;
}

// Create product
export const createProduct = async (body: productBody): Promise<Product> => {
  return productRepo.create({
    data: body,
  });
};

// Update product
export const updateProduct = async (
  body: productBody,
  id: number
): Promise<Product> => {
  return productRepo.update({ where: { id }, data: body });
};
