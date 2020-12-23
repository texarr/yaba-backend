export class UserInterface {
  id: string;
  name: string;
  email: string;
  password: string;
  emailConfirmed: boolean;
  confirmationToken?: string;
}
