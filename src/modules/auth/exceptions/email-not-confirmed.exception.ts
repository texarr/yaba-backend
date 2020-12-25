import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailNotConfirmedException extends HttpException {
  constructor() {
    super('Email not confirmed', HttpStatus.UNAUTHORIZED);
  }
}
