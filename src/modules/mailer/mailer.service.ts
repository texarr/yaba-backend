import { Injectable } from '@nestjs/common';
import { Transporter, createTransport, SendMailOptions } from 'nodemailer';
import { Attachment } from 'nodemailer/lib/mailer';
import { ConfirmationEmailDto } from './dto/confirmation-email.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import { UserEmailDto } from './dto/user-email.dto';
import { v4 as uuid4 } from 'uuid';
import { UserInterface } from '../auth/models/user.interface';

@Injectable()
export class MailerService {
  private transporter: Transporter;

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    this.transporter = createTransport({
      // @ts-ignore
      host: process.env.MAILER_HOST,
      port: process.env.MAILER_PORT,
      secure: true,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD,
      },
    });
  }

  /// A general function for sending emails
  async sendEmail(
    from: string,
    to: string,
    subject: string,
    text: string,
    html: string,
    attachments?: Attachment[],
  ) {
    const options: SendMailOptions = {
      from,
      to,
      subject,
      text,
      html,
      attachments,
    };

    /// Send mail with defined transport object
    return await this.transporter.sendMail(options);
  }

  async sendAccountConfirmationEmail(
    confirmationEmailDto: ConfirmationEmailDto,
  ) {
    // todo: handle multilanguage mail templates
    const text = `Witaj: ${confirmationEmailDto.name}
    Wklej ten adres w przeglądarce w celu weryfikacji konta: ${process.env.APP_BASE_URL}/auth/confirm/${confirmationEmailDto.confirmationToken}`;

    const html = `<p>Witaj: ${confirmationEmailDto.name}</p>
    <p>Dziękujemy za założenie konta, aby potwierdzić konto naciśnij poniższy link:</p>
    <br/><a href="${process.env.APP_BASE_URL}/auth/confirm/${confirmationEmailDto.confirmationToken}">${process.env.APP_BASE_URL}/auth/confirm/${confirmationEmailDto.confirmationToken}</a>`;

    await this.sendEmail(
      'Budget App <jaspergh@protonmail.com>',
      confirmationEmailDto.email,
      'YABA - Aktywacja konta',
      text,
      html,
    );
  }

  async resendEmail(userEmailDto: UserEmailDto): Promise<UserInterface | null> {
    const existingAccount = await this.userRepository.findOne({
      email: userEmailDto.email,
    });

    if (existingAccount && !existingAccount.emailConfirmed) {
      existingAccount.confirmationToken = uuid4();

      await this.sendAccountConfirmationEmail({
        email: existingAccount.email,
        name: existingAccount.name,
        confirmationToken: existingAccount.confirmationToken,
      });

      const existingAccountCb: UserInterface = existingAccount;
      delete existingAccountCb.password;

      return await this.userRepository.save(existingAccountCb);
    }

    return null;
  }
}
