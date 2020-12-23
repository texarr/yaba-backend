import { IsString } from 'class-validator';

export class ConfirmationEmailDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  confirmationToken: string;
}
