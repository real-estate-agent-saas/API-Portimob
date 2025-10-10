import {
  IsString,
  IsNumber,
} from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  title: string;

  @IsNumber()
  roomsQty: number;

  @IsNumber()
  bathroomsQty: number;

  @IsNumber()
  parkingSpacesQty: number;

  @IsNumber()
  area: number;

}
