// NestJS
import { Inject, Injectable } from '@nestjs/common';

// Repositories Interface
import type { IUserRepository } from '../../infra/repositories/Iuser.repository';
import type { ITemplatesConfigRepository } from 'src/templates-config/infra/repositories/ItemplatesConfig.repository';
import type { ITemplatesRepository } from 'src/templates/infra/repositories/Itemplates.repository';
import type { IWebsiteRepository } from 'src/websites/infra/repositories/websites/Iwebsite.repository';

// Presenter
import { CreateUserPresenter } from '../presenters/create-user.presenter';

// Helpers
import { TemplatesHelper } from 'src/templates/infra/helpers/templates.helper';
import { TemplatesConfigHelper } from 'src/templates-config/infra/helpers/templates-config.helper';
import { WebsitesHelper } from 'src/websites/infra/helpers/websites.helper';

// DTOs
import { CreateUserDto } from '../../dto/create-user.dto';

// Entities
import { UserEntity } from '../../entities/user.entity';
import { WebsiteEntity } from 'src/websites/entities/website.entity';
import { TemplateConfigEntity } from 'src/templates-config/entities/templates-config.entity';

//Errors
import { ExistingUserError } from 'src/users/errors/existing-user.error';
import { WebsiteCreateError } from 'src/websites/errors/create-website.error';

// Other
import * as bcrypt from 'bcrypt';
import { TemplateConfigGenerator } from 'src/templates-config/domain/template-config-generator';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IWebsiteRepository')
    private readonly websiteRepository: IWebsiteRepository,
    @Inject('ITemplatesConfigRepository')
    private readonly templateConfigRepository: ITemplatesConfigRepository,
    @Inject('ITemplatesRepository')
    private readonly templateRepository: ITemplatesRepository,
    private readonly templatesHelper: TemplatesHelper,
    private readonly templatesConfigHelper: TemplatesConfigHelper,
    private readonly websitesHelper: WebsitesHelper,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<CreateUserPresenter> {
    // Verifies if a user with the given email already exists
    const existingUser = await this.userRepository.findByEmail(
      createUserDto.email,
    );

    // If user exists, throw a conflict exception
    if (existingUser) {
      throw new ExistingUserError({ email: createUserDto.email });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Create a new UserEntity
    const userEntity = UserEntity.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
    });

    // Save the new user to the repository
    const createdUser = await this.userRepository.create(userEntity);

    // --------------------------------- WEBSITE CREATION ----------------------------------------

    // Creates a website with userId
    const website = WebsiteEntity.create({
      userId: createdUser.id!,
      realtorName: createdUser.name,
    });
    const createdWebsite = await this.websitesHelper.create(website);

    // Sets websiteId to the createdUser and updates it
    createdUser.setWebsiteId(createdWebsite.id!);
    await this.userRepository.update(createdUser);

    // --------------------------------- DEFAULT TEMPLATE SEARCH ----------------------------------------

    // Fetches the default template
    const defaultTemplate =
      await this.templatesHelper.findTemplateByCode('default');

    // Generates default template config values
    const defaultTemplateConfigValues: Record<string, any> =
      TemplateConfigGenerator.generateTemplateConfig(defaultTemplate);

    // --------------------------------- TEMPLATE CONFIG CREATION ----------------------------------------

    const templateConfig = TemplateConfigEntity.create({
      templateCode: defaultTemplate.templateCode,
      userId: createdUser.id!,
      websiteId: createdWebsite.id!,
      values: defaultTemplateConfigValues,
    });

    // Saves a template config with initial values related to the userWebsite
    const createdTemplateConfig =
      await this.templatesConfigHelper.createTemplateConfig(templateConfig);

    // Updates entity to persists it on DB
    createdWebsite.setTemplate(
      createdTemplateConfig.templateCode,
      createdTemplateConfig.id!,
    );

    // Saves on DB
    await this.websitesHelper.update(createdWebsite);

    // Return the created user without the password
    return CreateUserPresenter.fromEntity(createdUser);
  }
}
