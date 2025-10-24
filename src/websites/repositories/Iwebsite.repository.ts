import { CreateWebsiteDto } from "../dto/create-website.dto";
import { WebsiteEntity } from "../entities/website.entity";

export interface IWebsiteRepository{
    create(CreateWebsiteDto: CreateWebsiteDto)/*não sei usar as promises aqui ;-;*/
}