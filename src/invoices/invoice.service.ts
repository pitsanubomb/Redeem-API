import { Invoice, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const invoiceRepo = prisma.invoice;

export const createProduct = async (body: {
  userId: string;
  productList: Array<{ id: number; quantity: number }>;
}) => {
  const createData: Array<{
    products: { connect: { id: number } };
    quantity: number;
  }> = [];
  for (const productInvoice of body.productList) {
    createData.push({
      products: { connect: { id: productInvoice.id } },
      quantity: productInvoice.quantity,
    });
  }
  await invoiceRepo.create({
    data: {
      customer: { connect: { id: body.userId } },
      ProductOrder: { create: createData },
    },
  });
};

export const getAllInvoice = async (): Promise<Invoice[]> => {
  const res = await invoiceRepo.findMany({
    include: { ProductOrder: { include: { products: true } }, customer: true },
  });
  return res.map((invoice) => {
    return {
      ...invoice,
      customer: {
        Id: invoice.customer.id,
        Fullname: invoice.customer.firstName + ' ' + invoice.customer.lastName,
        Emai: invoice.customer.email,
      },
    };
  });
};
