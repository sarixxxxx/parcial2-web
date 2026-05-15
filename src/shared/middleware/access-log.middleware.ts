import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AccessLogMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const userId: string = (req.headers['x-user-id'] as string) ?? 'ANONYMOUS';
    const url: string = (req as any).originalUrl ?? req.url;
    console.log(`[User: ${userId}] accedió a ${url} - ${req.method}`);
    next();
  }
}