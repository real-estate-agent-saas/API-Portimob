import { Test, TestingModule } from '@nestjs/testing';
import { CreatePropertyUseCase } from 'src/properties/application/use-cases/create-property.usecase';
import { CreatePropertyDto } from 'src/properties/dtos/create-property.dto';
import { PropertyPresenter } from 'src/properties/application/presenters/property.presenter';
import { PropertyEntity } from 'src/properties/entities/property.entity';
import { IPropertyRepository } from 'src/properties/infra/repositories/Iproperty.repository';

let createPropertyUseCase: CreatePropertyUseCase;
let propertyRepositoryMock: Partial<jest.Mocked<IPropertyRepository>>;

beforeEach(async () => {
  propertyRepositoryMock = {
    create: jest.fn(), // Mocking only the 'create' method
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
  it('Should Create a Property Successfully', async () => {
    //-------------------------------- Arrange (Simulates a HTTP Request) -----------------------------------
    const createPropertyDto: CreatePropertyDto = {
      title: 'Imóvel Morumbi',
      userId: 'Usuário 1',
    };

    // Property entity that will return after the request to the mock
    const propertyEntity = PropertyEntity.create(createPropertyDto);

    // Simulates what the DB would return (Object with some additional metadata)
    const propertyMock = {
      ...propertyEntity,
      id: 'property-123',
    };

    // Instructs o IRepositoryMock to return an specific value when the Use-Case calls it
    propertyRepositoryMock.create?.mockResolvedValueOnce(
      propertyMock as PropertyEntity,
    );

    //--------------------------- Act - (Executes the action|UseCase that is been tested) -------------------------------
    // Variable "result" recives property mocked value
    const result = await createPropertyUseCase.execute(createPropertyDto);

    //------------------------- Assert - (Defines conditions to verify if the test passed) -----------------------------
    // Verifies if the correct object type was passed for creation into the repository
    expect(propertyRepositoryMock.create).toHaveBeenCalledWith(
      expect.any(PropertyEntity),
    );

    // Verifies if the "create" method from repository was called once
    expect(propertyRepositoryMock.create).toHaveBeenCalledTimes(1);

    // Verifies if the returned value in the Use-Case is a PropertyResponseDto instace 
    expect(result).toBeInstanceOf(PropertyPresenter);

    // Verifies if the result contains everything we expect to recieve after saving a property on the DB
    expect(result).toEqual(
      expect.objectContaining({
        id: 'property-123',
        title: 'Imóvel Morumbi',
        userId: 'Usuário 1',
        isActive: true,
      }),
    );
  });
});
