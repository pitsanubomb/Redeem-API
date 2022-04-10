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
