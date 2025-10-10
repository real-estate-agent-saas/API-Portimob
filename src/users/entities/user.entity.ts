export class UserEntity {
  readonly id?: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;

  // Public exibition data
  publicEmail?: string;
  whatsapp?: string;
  phone?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  profileImage?: string;
  bio?: string;
  careerStartDate?: Date;
  creci?: string;
  gender?: string;

  // Control
  isActive?: boolean;

  // Relationships
  specialties?: string[];
  properties?: string[];
  dynamicWebsite?: string[];

  constructor(
    props: Partial<UserEntity> & {
      name: string;
      email: string;
      password: string;
      id?: string;
    },
  ) {
    Object.assign(this, props);
  }
}
