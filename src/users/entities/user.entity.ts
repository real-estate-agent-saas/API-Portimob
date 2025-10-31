import { InvalidUserError } from '../errors/invalid-user.error';

export interface UserProps {
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
  isActive: boolean;
  private propertyIds?: string[];
  private websiteId?: string;

  private constructor(props: UserProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.isActive = true;
  }

  //--------------------------------- Factory Method ---------------------------------

  static create(props: UserProps, websiteId?: string, propertyIds?: string[]): UserEntity {
    const user = new UserEntity(props);
    if (websiteId) {
      user.setWebsiteId(websiteId);
    }
    if (propertyIds) {
      user.setPropertyIds(propertyIds);
    }

    return user;
  }

  update(props: Partial<UserProps>): void {
    Object.assign(this, props);
  }

  //---------------------------------- WEBSITE ID  --------------------------
  getWebsiteId(): string | undefined {
    return this.websiteId;
  }

  setWebsiteId(websiteId: string): void {
    if (!websiteId) {
      throw new InvalidUserError('WebsiteId inválido!');
    }
    this.websiteId = websiteId;
  }

  //---------------------------------- PROPERTY IDs  --------------------------

  getPropertyIds(): string[] | undefined {
    return this.propertyIds;
  }

  setPropertyIds(propertyIds: string[]): void {
    this.propertyIds = propertyIds;
  }

  activate(): void {
    this.isActive = true;
  }

  deactivate(): void {
    this.isActive = false;
  }
}
