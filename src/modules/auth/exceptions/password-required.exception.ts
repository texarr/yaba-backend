import { HttpException, HttpStatus } from '@nestjs/common';

export class PasswordRequiredException extends HttpException {
  constructor() {
    super('Password required', HttpStatus.UNAUTHORIZED);
  }
}
