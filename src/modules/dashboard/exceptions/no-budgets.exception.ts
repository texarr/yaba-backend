import { HttpException, HttpStatus } from '@nestjs/common';

export class NoBudgetsException extends HttpException {
  constructor() {
    super('You have no budgets already', HttpStatus.CONFLICT);
  }
}
