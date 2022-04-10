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

// Get product
export const getAllProduct = async (): Promise<Product[] | null> => {
  return productRepo.findMany();
};

export const getProductById = async (id: number): Promise<Product | null> => {
  return productRepo.findUnique({ where: { id } });
};

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

// Delete product
export const delProduct = async (id: number): Promise<void> => {
  await productRepo.delete({ where: { id } });
};
