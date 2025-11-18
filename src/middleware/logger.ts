import { Request, Response, NextFunction} from 'express';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const body = req.body;

  console.log('========== REQUEST LOG ==========');
  console.log(`Timestamp: ${timestamp}`);
  console.log(`Method: ${method}`);
  console.log(`URL: ${url}`);
  console.log(`Body:`, body);
  console.log('=================================\n');

  next();
};

export default loggerMiddleware;
