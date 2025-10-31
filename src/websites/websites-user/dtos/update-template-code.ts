import { IsString } from "class-validator";

export class UpdateTemplateCodeDto {
  @IsString()
  templateCode: string;
}
