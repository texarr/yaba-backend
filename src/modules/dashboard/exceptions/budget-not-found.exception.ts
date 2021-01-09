import { HttpException, HttpStatus } from '@nestjs/common';

export class BudgetNotFoundException extends HttpException {
  constructor() {
    super('Budget not found', HttpStatus.BAD_REQUEST);
  }
}
