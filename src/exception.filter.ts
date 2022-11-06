import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { PrismaClientValidationError } from '@prisma/client/runtime';
import { Request, Response } from 'express';

@Catch(PrismaClientValidationError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(400).json({
      statusCode: 400,
      message: 'Input data is invalid',
    });
  }
}
