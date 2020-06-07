import path from 'path';
import express, {Request, Response, NextFunction} from 'express';
//import { BAD_REQUEST } from 'http-status-codes';
import BaseRouter from './routes'

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', BaseRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.message);
    return res.status(400).json({error: err.message});
});

const port = process.argv[2] || 3000;
app.listen(port);
console.log(`Server started on port ${port}`);
