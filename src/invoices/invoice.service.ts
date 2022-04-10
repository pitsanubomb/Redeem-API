import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const invoiceRepo = prisma.invoice;

export const createInvoice = async (body: {
  userId: string;
  productList: Array<{ id: number }>;
  isReedeem?: boolean;
}) => {
  let listOfProduct: Array<{ product: { connect: { id: number } } }> = [];
  for (const data of body.productList) {
    listOfProduct.push({ product: { connect: { id: data.id } } });
  }
  console.log(body.userId);
  return invoiceRepo.create({
    data: {
      isReedeem: body.isReedeem,
      user: { connect: { id: body.userId } },
      products: {
        create: listOfProduct,
      },
    },
  });
};

export const getAllInvoice = async () => {
  return invoiceRepo.findMany();
};
