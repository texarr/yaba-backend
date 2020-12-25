import { HttpException, HttpStatus } from '@nestjs/common';

export class IncorrectPasswordException extends HttpException {
  constructor() {
    super('Incorrect password', HttpStatus.UNAUTHORIZED);
  }
}
