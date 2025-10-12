export class UserEntity {
  readonly id?: string;
  name: string;
  email: string;
  passwordHash: string;

  // Control
  isActive?: boolean;

  // Relationships
  propertyIds?: string[];
  dynamicWebsiteId?: string;

  constructor(
    name: string,
    email: string,
    passwordHash: string,
    id?: string,
    propertyIds?: string[],
    dynamicWebsiteId?: string,
  ) {
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.id = id;
    this.propertyIds = propertyIds;
    this.dynamicWebsiteId = dynamicWebsiteId;
  }
}
