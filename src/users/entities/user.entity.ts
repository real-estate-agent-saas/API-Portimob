export interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  isActive?: boolean;
  propertyIds?: string[];
  websiteId?: string;
}

export class UserEntity {
  readonly id?: string;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  propertyIds?: string[];
  websiteId?: string;

  private constructor(props: UserProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.isActive = props.isActive ?? true;
    this.propertyIds = props.propertyIds;
    this.websiteId = props.websiteId;
  }

  static create(props: UserProps): UserEntity {
    return new UserEntity(props);
  }

  update(props: Partial<UserProps>): void {
    Object.assign(this, props);
  }

  activate(): void {
    this.isActive = true;
  }

  deactivate(): void {
    this.isActive = false;
  }
}
