import { Router, Request, Response } from 'express';
import reqAuth from '../middleware/reqAuth.middleware';
import * as InvoiceService from './invoice.service';

export const InvoiceControler = Router();

InvoiceControler.post('/', reqAuth, async (req: any, res: Response) => {
  try {
    let body = req.body;
    body.userId = req.user.id;
    await InvoiceService.createInvoice(body);
    res.status(201).send({ message: 'Buy product success' });
  } catch (error) {
    res.status(500).send(error);
  }
});

InvoiceControler.get('/', reqAuth, async (req: Request, res: Response) => {
  try {
    const invoice = await InvoiceService.getAllInvoice();
    res.status(200).send({ invoice: invoice });
  } catch (error) {
    res.status(500).send(error);
  }
});
