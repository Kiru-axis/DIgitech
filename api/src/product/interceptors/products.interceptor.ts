import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

/**
 * THE Interceptor is necessary since the data send by frontend is FormData,
 * but the dto is json.
 * The interceptor has to be before any other interceptor,else it wont work
 */

@Injectable()
export class ProductsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const body = {
      ...req.body,
      tags: JSON.parse(req.body['tags']),
      colors: JSON.parse(req.body['colors']),
      price: Number(req.body['price']),
      quantity: Number(req.body['quantity']),
    };

    req.body = body;

    return next.handle();
  }
}
