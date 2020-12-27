import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyConfirmedException extends HttpException {
  constructor() {
    super(
      'You have confirmed your email already, go back to your job ;)',
      HttpStatus.MOVED_PERMANENTLY,
    );
  }
}
