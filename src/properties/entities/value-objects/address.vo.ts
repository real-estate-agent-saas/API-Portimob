export class Address {
  constructor(
    public street?: string,
    public propertyNumber?: string,
    public complement?: string,
    public neighborhood?: string,
    public city?: string,
    public state?: string,
    public zipCode?: string,
    public zone?: string,
    public latitude?: number,
    public longitude?: number,
  ) {}
}