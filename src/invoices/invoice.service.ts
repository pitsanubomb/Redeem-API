import { Invoice, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const invoiceRepo = prisma.invoice;
const productInvoiceRepo = prisma.productInInvoice;

export const createBuyProduct = async (body: {
  productList: Array<{ id: number; quantity: number }>;
  useId: string;
  isRedeem?: boolean;
}) => {
  const listOfProductInvoice: Array<{ id: number }> = [];
  for (const products of body.productList) {
    const productInvoice = await productInvoiceRepo.create({
      data: {
        quantity: products.quantity,
        products: { connect: { id: products.id } },
        invoices: {},
      },
    });
    listOfProductInvoice.push({ id: productInvoice.id });
    return invoiceRepo.create({
      data: {
        user: { connect: { id: body.useId } },
        isRedeem: body.isRedeem || false,
        invoices: { connect: listOfProductInvoice },
      },
    });
  }
};

export const getAllInvoice = async (): Promise<Invoice[]> => {
  return invoiceRepo.findMany({ include: { user: true, invoices: true } });
};
