import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailTakenException extends HttpException {
  constructor() {
    super('Email already taken', HttpStatus.CONFLICT);
  }
}
