interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export class UserEntity {
  readonly id?: string;
  name: string;
  email: string;
  password: string;

  private constructor(props: UserProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
  }

  static create(props: UserProps): UserEntity {
    return new UserEntity(props);
  }
}
