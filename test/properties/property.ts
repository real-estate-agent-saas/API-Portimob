// Testing Dependencies
import { Test, TestingModule } from '@nestjs/testing';

// Services
import { CreatePropertyUseCase } from 'src/properties/application/use-cases/create-property.usecase';
import { DeletePropertyUseCase } from 'src/properties/application/use-cases/delete-property.usecase';
import { FindOnePropertyUseCase } from 'src/properties/application/use-cases/find-one-property.usecase';
import { UpdatePropertyUseCase } from 'src/properties/application/use-cases/update-property.usecase';

// DTOs
import { CreatePropertyDto } from 'src/properties/dtos/create-property.dto';
import { PropertyEntity } from 'src/properties/entities/property.entity';

// Repository Interface
import { IPropertyRepository } from 'src/properties/infra/repositories/Iproperty.repository';

describe('Property Services', () => {
  let createPropertyUseCase: CreatePropertyUseCase;
  let updatePropertyUseCase: UpdatePropertyUseCase;
  let deletePropertyUseCase: DeletePropertyUseCase;
  let findOnePropertyUseCase: FindOnePropertyUseCase;
  let propertyRepositoryMock: jest.Mocked<IPropertyRepository>;

  beforeEach(async () => {
    propertyRepositoryMock = {
      create: jest.fn(),
      update: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePropertyUseCase,
        UpdatePropertyUseCase,
        FindOnePropertyUseCase,
        DeletePropertyUseCase,
        {
          provide: 'IPropertyRepository',
          useValue: propertyRepositoryMock,
        },
      ],
    }).compile();

    createPropertyUseCase = moduleFixture.get(CreatePropertyUseCase);
    updatePropertyUseCase = moduleFixture.get(UpdatePropertyUseCase);
    findOnePropertyUseCase = moduleFixture.get(FindOnePropertyUseCase);
    deletePropertyUseCase = moduleFixture.get(DeletePropertyUseCase);
  });

  // ------------------------
  // TESTES DE CADA USE CASE
  // ------------------------
  describe('CreatePropertyUseCase', () => {
    it('should create a property successfully', async () => {
      const createPropertyDto: CreatePropertyDto = {
        title: 'Casa Teste',
        userId: '123',
      };
      const propertyMock = PropertyEntity.create({
        title: 'Casa Teste',
        userId: '123',
      });

      propertyRepositoryMock.create.mockResolvedValueOnce(propertyMock);

      const result = await createPropertyUseCase.execute(createPropertyDto);

      expect(propertyRepositoryMock.create).toHaveBeenCalledTimes(1);
      expect(propertyRepositoryMock.create).toHaveBeenCalledWith(
        expect.any(PropertyEntity),
      );
      expect(result).toEqual(propertyMock);
    });
  });

  describe('UpdatePropertyUseCase', () => {
    it('should update a property successfully', async () => {
      const propertyMock = { id: '1', title: 'Casa Atualizada' } as any;

      propertyRepositoryMock.update.mockResolvedValue(propertyMock);

      const result = await updatePropertyUseCase.execute('1', {
        title: 'Casa Atualizada',
      } as any);

      expect(propertyRepositoryMock.update).toHaveBeenCalledWith(
        '1',
        expect.any(Object),
      );
      expect(result).toEqual(propertyMock);
    });
  });

  describe('FindOnePropertyUseCase', () => {
    it('should return a property by id', async () => {
      const propertyMock = { id: '1', title: 'Casa Teste' } as any;
      propertyRepositoryMock.findOne.mockResolvedValue(propertyMock);

      const result = await findOnePropertyUseCase.execute('1');

      expect(propertyRepositoryMock.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual(propertyMock);
    });
  });

  describe('DeletePropertyUseCase', () => {
    it('should delete a property successfully', async () => {
      propertyRepositoryMock.delete.mockResolvedValueOnce(true);
      const result = await deletePropertyUseCase.execute('1');
      expect(propertyRepositoryMock.delete).toHaveBeenCalledWith('1');
      expect(result).toBeTruthy();
    });
  });
});
