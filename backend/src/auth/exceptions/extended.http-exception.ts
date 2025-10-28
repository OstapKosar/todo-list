import { HttpException, HttpStatus } from '@nestjs/common';

export class ExtendedHttpException extends HttpException {
  constructor(
    message: string,
    status: HttpStatus,
    public readonly code?: string,
  ) {
    super(
      {
        message,
        status,
        code,
        timestamp: new Date().toISOString(),
      },
      status,
    );
  }
}
