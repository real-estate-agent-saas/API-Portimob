import { Test, TestingModule } from '@nestjs/testing';
import { CreatePropertyUseCase } from 'src/properties/application/use-cases/create-property.usecase';
import { CreatePropertyDto } from 'src/properties/dtos/create-property.dto';
import { PropertyResponseDto } from 'src/properties/dtos/property-response.dto';
import { PropertyEntity } from 'src/properties/entities/property.entity';
import { IPropertyRepository } from 'src/properties/repositories/Iproperty.repository';

let createPropertyUseCase: CreatePropertyUseCase;
let propertyRepositoryMock: Partial<jest.Mocked<IPropertyRepository>>;

beforeEach(async () => {
  propertyRepositoryMock = {
    create: jest.fn(),
  };

  const moduleFixture: TestingModule = await Test.createTestingModule({
    providers: [
      CreatePropertyUseCase,
      {
        provide: 'IPropertyRepository',
        useValue: propertyRepositoryMock,
      },
    ],
  }).compile();

  createPropertyUseCase = moduleFixture.get(CreatePropertyUseCase);
});

describe('CreatePropertyUseCase', () => {
  it('Should Create a Property', async () => {
    // Arrange (Simulates a HTTP Request)
    const createPropertyDto: CreatePropertyDto = {
      title: 'Imóvel Morumbi',
      userId: 'Usuário 1',
    };

    // Base return to mount the Use Case response
    const propertyEntity = PropertyEntity.create(createPropertyDto);

    // Simulates what the DB would return (Object with some additional metadata)
    const propertyMock = {
      ...propertyEntity,
      id: 'property-123',
    };

    // Instructs o IRepositoryMock to return an specific value when the use case calls it
    propertyRepositoryMock.create?.mockResolvedValueOnce(
      propertyMock as PropertyEntity,
    );

    //Act - (Executes the action that is been tested)
    const result = await createPropertyUseCase.execute(createPropertyDto);

    // Assert - (Defines conditions to verify if the test passed)

    // Verifies if the correct object type was passed for creation into the repository
    expect(propertyRepositoryMock.create).toHaveBeenCalledWith(
      expect.any(PropertyEntity),
    );

    // Verifies if the method create from repository was called once
    expect(propertyRepositoryMock.create).toHaveBeenCalledTimes(1);

    // Verifies if the return value of the use case is a DTO to pass to the controller generate the response
    expect(result).toBeInstanceOf(PropertyResponseDto);

    // Verifies if the result contains everything we expect to recieve after saving a property on the DB
    expect(result).toEqual(
      expect.objectContaining({
        id: 'property-123',
        title: 'Imóvel Morumbi',
        userId: 'Usuário 1',
      }),
    );
  });
});
