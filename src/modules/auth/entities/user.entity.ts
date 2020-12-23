import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid4 } from 'uuid';
import * as bcrypt from 'bcryptjs';

@Entity()
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  emailConfirmed: boolean;

  @Column()
  confirmationToken: string;

  constructor() {
    this.id = uuid4();
    this.emailConfirmed = false;
    this.confirmationToken = uuid4();
  }

  setPassword(password: string) {
    this.password = bcrypt.hashSync(password, 10);
  }

  confirmEmail() {
    this.emailConfirmed = true;
  }
}
