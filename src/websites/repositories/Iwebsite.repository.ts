import { CreateWebsiteDto } from "../dto/create-website.dto";
import { WebsiteEntity } from "../entities/website.entity";

export interface IWebsiteRepository{
    create(CreateWebsiteDto: CreateWebsiteDto): Promise<WebsiteEntity>; //devemos retornar as props aqui também?
}