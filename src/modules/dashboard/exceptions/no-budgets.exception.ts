import { HttpException, HttpStatus } from '@nestjs/common';

export class NoBudgetsException extends HttpException {
  constructor() {
    super('You have no budgets yet', HttpStatus.NOT_FOUND);
  }
}
