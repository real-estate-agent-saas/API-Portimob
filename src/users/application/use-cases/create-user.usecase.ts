import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UserEntity } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserPresenter } from '../presenters/create-user.presenter';
import { ExistingUserError } from 'src/users/errors/existing-user.error';
import { WebsiteEntity } from 'src/websites/entities/website.entity';
import { TemplateConfigEntity } from 'src/templates-config/entities/templates-config.entity';
import type { IUserRepository } from '../../infra/repositories/Iuser.repository';
import type { IWebsiteRepository } from 'src/websites/infra/repositories/Iwebsite.repository';
import type { ITemplatesConfigRepository } from 'src/templates-config/infra/repositories/ItemplatesConfig.repository';
import type { ITemplatesRepository } from 'src/templates/infra/repositories/Itemplates.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject('IWebsiteRepository')
    private readonly websiteRepository: IWebsiteRepository,
    @Inject('ITemplatesConfigRepository')
    private readonly templateConfigRepository: ITemplatesConfigRepository,
    @Inject('ITemplatesRepository')
    private readonly templateRepository: ITemplatesRepository,
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
    });
    const createdWebsite = await this.websiteRepository.create(website);
    if (!createdWebsite) throw new Error('Não foi possível criar o website');

    // --------------------------------- DEFAULT TEMPLATE SEARCH ----------------------------------------

    // Fetches the default template
    const defaultTemplate =
      await this.templateRepository.findByCode('dianaimoveis');

    if (!defaultTemplate) throw new Error('Template padrão não encontrado');

    // Generates default template config values
    const defaultTemplateConfigValues: Record<string, any> = Object.fromEntries(
      defaultTemplate.fields.map((f) => [f.key, f.defaultValue ?? null]),
    );

    // --------------------------------- TEMPLATE CONFIG CREATION ----------------------------------------

    const templateConfig = TemplateConfigEntity.create({
      templateCode: defaultTemplate.templateCode,
      userId: createdUser.id!,
      websiteId: createdWebsite.id!,
      values: defaultTemplateConfigValues,
    });

    const createdTemplateConfig =
      await this.templateConfigRepository.create(templateConfig);

    if (!createdTemplateConfig)
      throw new Error('Não foi possível criar a configuração do template');

    createdWebsite.update({
      templateConfigId: createdTemplateConfig.id,
      template: {
        name: defaultTemplate.name,
        id: defaultTemplate.id!,
      },
    });

    const updatedWebsite = await this.websiteRepository.update(createdWebsite);

    if (!updatedWebsite)
      throw new Error('Não foi possível atualizar o website com o template');

    createdUser.update({
      websiteId: updatedWebsite.id,
    });

    await this.userRepository.update(createdUser.id!, { websiteId: updatedWebsite.id });

    // Return the created user without the password
    return CreateUserPresenter.fromEntity(createdUser);
  }
}
