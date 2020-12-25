import { UserInterface } from '../models/user.interface';

export class JwtResponseInterface {
  expiresIn: number;
  accessToken: string;
  id?: string;
  user?: UserInterface;
}
