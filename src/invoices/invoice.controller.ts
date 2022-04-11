import { Router, Request, Response } from 'express';
import reqAuth from '../middleware/reqAuth.middleware';
import * as InvoiceService from './invoice.service';

export const InvoiceControler = Router();

InvoiceControler.post('/', reqAuth, async (req: any, res: Response) => {
  try {
    const body = req.body;
    body.userId = req.user.id;
    await InvoiceService.createProduct(body);
    res.status(201).send({ message: 'Buy products compleate' });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

InvoiceControler.get('/', reqAuth, async (req: Request, res: Response) => {
  try {
    const responseData = await InvoiceService.getAllInvoice();
    res.send({ invoice: responseData });
  } catch (error) {
    res.status(500).send(error);
  }
});
