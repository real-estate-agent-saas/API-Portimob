import { BadRequestException } from '@nestjs/common';
import { RESERVED_WORDS } from 'src/websites/constants/reserved-words';
import { InvalidSlugError } from '../errors/invalid-slug.error';

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
    // Expected Format
    if (!/^[a-z][a-z0-9-]*$/.test(slug)) {
      throw new InvalidSlugError(
        'O slug deve começar com uma letra e conter apenas letras, números e hífens.', { slug }
      );
    }

    // It can't just be a number
    if (/^\d+$/.test(slug)) {
      throw new InvalidSlugError('O slug não pode conter apenas números.', { slug });
    }

    // Reserved Words
    const isForbidden = this.forbiddenSlugs.some((word) => slug === word);
    if (isForbidden) {
      throw new InvalidSlugError(
        'O slug não pode conter uma palavra reservada.', { slug }
      );
    }

    // Minimum/maximum size
    if (slug.length < 3 || slug.length > 26) {
      throw new InvalidSlugError('O slug deve ter entre 3 e 26 caracteres.', { slug });
    }
  }

  // Combines normalization and validation
  static normalizeAndValidate(slug: string): string {
    const normalizedSlug = this.normalize(slug);
    this.validate(normalizedSlug);
    return normalizedSlug;
  }

  
}
