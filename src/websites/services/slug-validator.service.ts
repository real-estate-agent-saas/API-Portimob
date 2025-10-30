import { BadRequestException } from '@nestjs/common';
import { RESERVED_WORDS } from 'src/websites/constants/reserved-words';

export class SlugValidatorService {
  private static readonly forbiddenSlugs = RESERVED_WORDS;

  static normalize(slug: string): string {
    return slug
      .trim()
      .toLowerCase()
      .normalize('NFD') // separates accents (ex: á → a + ´)
      .replace(/[\u0300-\u036f]/g, '') // remove accents
      .replace(/\s+/g, '-') // replace spaces with hyphens
      .replace(/[^a-z0-9-]/g, '') // remove symbols
      .replace(/-+/g, '-') // avoid double hyphens
      .replace(/^-|-$/g, ''); // remove hyphen at beginning/end
  }

  static validate(slug: string): void {
    const normalized = slug.trim().toLowerCase();

    // Expected Format
    if (!/^[a-z][a-z0-9-]*$/.test(normalized)) {
      throw new BadRequestException(
        'O slug deve começar com uma letra e conter apenas letras, números e hífens.',
      );
    }

    // It can't just be a number
    if (/^\d+$/.test(normalized)) {
      throw new BadRequestException('O slug não pode conter apenas números.');
    }

    // Reserved Words
    const isForbidden = this.forbiddenSlugs.some((word) => normalized === word);
    if (isForbidden) {
      throw new BadRequestException(
        `O slug "${slug}" contém uma palavra reservada.`,
      );
    }

    // Minimum/maximum size
    if (normalized.length < 3 || normalized.length > 26) {
      throw new BadRequestException('O slug deve ter entre 3 e 26 caracteres.');
    }
  }

  // Combines normalization and validation
  static normalizeAndValidate(slug: string): string {
    const normalized = this.normalize(slug);
    this.validate(normalized);
    return normalized;
  }
}
