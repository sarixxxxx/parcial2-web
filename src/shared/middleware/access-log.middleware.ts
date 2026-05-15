import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class AccessLogMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: NextFunction) {
    const userId: string = (req.headers['x-user-id'] as string) ?? 'ANONYMOUS';
    console.log(`[User: ${userId}] accedió a ${req.url} - ${req.method}`);
    next();
  }
}
