import { HttpException, HttpStatus } from '@nestjs/common';

export class TemplateNameAlreadyTakenException extends HttpException {
  constructor() {
    super('Template name already taken', HttpStatus.CONFLICT);
  }
}
