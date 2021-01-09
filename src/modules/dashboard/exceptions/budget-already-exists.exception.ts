import { HttpException, HttpStatus } from '@nestjs/common';

export class BudgetAlreadyExistsException extends HttpException {
  constructor() {
    super('Budget already exists', HttpStatus.BAD_REQUEST);
  }
}
