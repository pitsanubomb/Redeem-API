import { Product, ProductType } from '@prisma/client';
import { Router, Request, Response } from 'express';
import reqAuth from '../middleware/reqAuth.middleware';
import * as ProductService from './product.service';

export const ProductControler = Router();

ProductControler.post('/', reqAuth, async (req: Request, res: Response) => {
  try {
    await ProductService.createProduct(req.body);
    res.status(201).send({ message: 'Add product success' });
  } catch (error) {
    res.status(500).send(error);
  }
});

ProductControler.get('/', reqAuth, async (req: Request, res: Response) => {
  try {
    const productList: Product[] | null = await ProductService.getAllProduct();
    if (req.query.productType) {
      let productType: ProductType;
      switch (req.query.productType) {
        case 'cash':
          try {
            const productList: Product[] | null =
              await ProductService.getAllProduct(ProductType.CASH);
            res.status(200).send({ product: productList });
          } catch (error) {
            res.status(500).send(error);
          }
          break;
        case 'point':
          try {
            const productList: Product[] | null =
              await ProductService.getAllProduct(ProductType.POINT);
            res.status(200).send({ product: productList });
          } catch (error) {
            res.status(500).send(error);
          }
          break;
        default:
          break;
      }
    }
    res.status(200).send({ product: productList });
  } catch (error) {
    res.status(500).send(error);
  }
});

ProductControler.get('/:id', reqAuth, async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const product: Product | null = await ProductService.getProductById(id);
    res.status(200).send({ product: product });
  } catch (error) {
    res.status(500).send(error);
  }
});
