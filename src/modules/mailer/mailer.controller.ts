import { Body, Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { ApiResponse } from '@nestjs/swagger';
import { UserEmailDto } from './dto/user-email.dto';
import { UserInterface } from '../auth/models/user.interface';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('resendEmail')
  @ApiResponse({
    status: 200,
    description: 'Email has been send',
  })
  async resendEmail(
    @Body() email: UserEmailDto,
  ): Promise<UserInterface | null> {
    return this.mailerService.resendEmail(email);
  }
}
