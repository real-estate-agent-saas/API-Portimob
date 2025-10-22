interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  isActive?: boolean;
  propertyIds?: string[];
}

export class UserEntity {
  readonly id?: string;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  propertyIds?: string[];

  private constructor(props: UserProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.isActive = props.isActive ?? true;
    this.propertyIds = props.propertyIds;
  }

  static create(props: UserProps): UserEntity {
    return new UserEntity(props);
  }
}
