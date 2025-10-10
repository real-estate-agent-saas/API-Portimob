import { Module } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { CreatePropertyUseCase } from './application/use-cases/create-property.usecase';

@Module({
  controllers: [PropertiesController],
  providers: [PropertiesService, CreatePropertyUseCase],
})
export class PropertiesModule {}
