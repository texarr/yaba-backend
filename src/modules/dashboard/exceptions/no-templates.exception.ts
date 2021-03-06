import { HttpException, HttpStatus } from '@nestjs/common';

export class NoTemplatesException extends HttpException {
  constructor() {
    super('You have no templates yet', HttpStatus.CONFLICT);
  }
}
