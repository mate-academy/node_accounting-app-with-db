import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  HttpException,
  HttpStatus,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ExcludeNullInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const body = context.switchToHttp().getRequest().body;
    if (Object.keys(body).length == 0) {
      throw new BadRequestException();
    }
    return next.handle();
  }
}
