import { SetMetadata } from '@nestjs/common';

// Sets a route as public
export const IS_PUBLIC_KEY = 'isPublic';
export const IsPublic = () => SetMetadata(IS_PUBLIC_KEY, true);
