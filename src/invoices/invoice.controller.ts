import { Router, Request, Response } from 'express';
import reqAuth from '../middleware/reqAuth.middleware';
import * as InvoiceService from './invoice.service';
import * as UserService from '../users/user.service';
import { User } from '../users/interfaces/user.interface';

export const InvoiceControler = Router();

InvoiceControler.post('/', reqAuth, async (req: any, res: Response) => {
  try {
    const body = req.body;
    body.userId = req.user.id;
    const user: User | null = await UserService.findUserById(req.user.id);
    if (body.paymentType === 'CASH') {
      if (!user || user.cash < body.totalPrice)
        res.status(422).send({ message: 'Invalid payment' });
      UserService.minusCash(req.user.id, body.totalPrice);
      UserService.addPoint(req.user.id, body.reward);
    } else if (body.paymentType === 'POINT') {
      if (!user || user.point < body.point)
        res.status(422).send({ message: 'Invalid payment' });
      UserService.minusPoint(req.user.id, body.point);
    }
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
