import { Router, Request, Response } from 'express';
import reqAuth from '../middleware/reqAuth.middleware';
import * as ProductService from './product.service';

export const ProdcutController = Router();
reqAuth;

ProdcutController.post('/', async (req: Request, res: Response) => {
  const response = ProductService.createProduct(req.body);
  res.status(201).send({ product: response });
});
