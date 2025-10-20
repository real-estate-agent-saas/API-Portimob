export class Gallery {
  constructor(
    public imageUrl: string,
    public order: number,
  ) {
    if (order < 0) throw new Error('Ordem inválida');
  }
}
