import { errorHandler } from './middleware/error.middleware';
import express, { Application } from 'express';
import morgan from 'morgan';
import { UserController } from './users/user.controller';
import { notFoundHandler } from './middleware/notfound.middleware';
import { ProductControler } from './products/product.controller';
import { InvoiceControler } from './invoices/invoice.controller';

const app: Application = express();
const logger = morgan('common');

app.use(express.json());

// Logger
app.use(logger);

// Controller call
app.use('/api/users', UserController);
app.use('/api/product', ProductControler);
app.use('/api/invoice', InvoiceControler);

// Middleware manual
app.use(errorHandler);
app.use(notFoundHandler);

app.listen(3000, () => console.log('Redeem API server is running'));
