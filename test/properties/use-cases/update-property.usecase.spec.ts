import { Test, TestingModule } from '@nestjs/testing';
import { PropertyPresenter } from 'src/properties/application/presenters/property.presenter';
import { UpdatePropertyUseCase } from 'src/properties/application/use-cases/update-property.usecase';
import { UpdatePropertyDto } from 'src/properties/dtos/update-property.dto';
import { PropertyEntity } from 'src/properties/entities/property.entity';
import { IPropertyRepository } from 'src/properties/infra/repositories/Iproperty.repository';

let updatePropertyUseCase: UpdatePropertyUseCase;
let propertyRespositoryMock: Partial<jest.Mocked<IPropertyRepository>>;

beforeEach(async () => {
  propertyRespositoryMock = {
    findOne: jest.fn(),
    update: jest.fn(),
  };

  const moduleFixture: TestingModule = await Test.createTestingModule({
    providers: [
      UpdatePropertyUseCase,
      {
        provide: 'IPropertyRepository',
        useValue: propertyRespositoryMock,
      },
    ],
  }).compile();

  updatePropertyUseCase = moduleFixture.get(UpdatePropertyUseCase);
});

describe('UpdatePropertyUseCase', () => {
  it('Should Update a Property Sucessfully', async () => {
    //---------------------------- Arrange -------------------------

    // Request Data
    const propertyIdToBeUpdated: string = 'Imóvel 5';
    const updatePropertyDto: UpdatePropertyDto = {
      title: 'Imóvel Presença no Morumbi',
      isActive: true,
      price: 500000,
      area: 250,
      roomsQty: 4,
      bathroomsQty: 3,
      parkingSpacesQty: 2,
      coverImage: 'https://imovel.com/images/imovel-presenca-no-morumbi.jpg',
      isFeatured: true,
      isNearSubway: true,
      isFurnished: false,
      videoUrl: 'https://youtube.com/imovel-presenca-no-morumbi',
      userId: 'Usuário 3',
      description: 'Imóvel localizado em um dos melhores bairros da cidade',
      propertyTypology: { id: '1', name: 'Apartamento' },
      propertyType: { id: '3', name: 'Venda' },
      propertyPurpose: { id: '2', name: 'Residencial' },
      propertyDeliveryStatus: { id: '2', name: 'Pronta Entrega' },
      propertyStanding: { id: '4', name: 'Alto Padrão' },
      propertyLeisure: [
        { id: 'leisure1', name: 'Academia' },
        { id: 'leisure2', name: 'Mini mercado' },
      ],
      propertyGallery: [
        { imageUrl: 'https://imovel.com/images/gallery1.jpg', order: 1 },
        { imageUrl: 'https://imovel.com/images/gallery2.jpg', order: 2 },
      ],
      propertyFloorPlanGallery: [
        { imageUrl: 'https://imovel.com/images/floorplan1.jpg', order: 1 },
      ],
      address: {
        street: 'Avenida Morumbi',
        propertyNumber: '3000',
        neighborhood: 'Morumbi',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '05678000',
        complement: 'Apartamento 1502',
        latitude: -23.601,
        longitude: -46.719,
        zone: 'Sul',
      },
    };

    // Fake return value when calling "FindOne"
    const findOnePropertyMock = PropertyEntity.create({
      id: 'Imóvel 5',
      userId: 'Usuário 3',
      title: 'Imóvel sem graça em Parelheiros',
      isActive: false,
      propertyDeliveryStatus: { id: '1', name: 'Em Obras' },
      propertyLeisure: [
        { id: 'leisure 3', name: 'Piscina' },
        { id: 'leisure 4', name: 'Espaço Gourmet' },
      ],
    });

    // Fake return value when calling "Update"
    const updatedPropertyMock = findOnePropertyMock;
    updatedPropertyMock.update(updatePropertyDto);

    // Return fake values when this functions are called
    propertyRespositoryMock.findOne?.mockResolvedValueOnce(findOnePropertyMock);
    propertyRespositoryMock.update?.mockResolvedValueOnce(updatedPropertyMock);

    //----------------------------- Act -------------------------------

    const result = await updatePropertyUseCase.execute(
      propertyIdToBeUpdated,
      updatePropertyDto,
    );

    //---------------------------- Assert ------------------------------

    expect(propertyRespositoryMock.findOne).toHaveBeenCalledWith(
      propertyIdToBeUpdated,
    );

    expect(propertyRespositoryMock.update).toHaveBeenCalledWith(
      propertyIdToBeUpdated,
      expect.any(PropertyEntity),
    );

    expect(result).toBeInstanceOf(PropertyPresenter);

    expect(result).toEqual(
      expect.objectContaining({
        title: 'Imóvel Presença no Morumbi',
        isActive: true,
        price: 500000,
        area: 250,
        roomsQty: 4,
        bathroomsQty: 3,
        parkingSpacesQty: 2,
        coverImage: 'https://imovel.com/images/imovel-presenca-no-morumbi.jpg',
        isFeatured: true,
        isNearSubway: true,
        isFurnished: false,
        videoUrl: 'https://youtube.com/imovel-presenca-no-morumbi',
        userId: 'Usuário 3',
        description: 'Imóvel localizado em um dos melhores bairros da cidade',
        propertyTypology: { id: '1', name: 'Apartamento' },
        propertyType: { id: '3', name: 'Venda' },
        propertyPurpose: { id: '2', name: 'Residencial' },
        propertyDeliveryStatus: { id: '2', name: 'Pronta Entrega' },
        propertyStanding: { id: '4', name: 'Alto Padrão' },
        propertyLeisure: [
          { id: 'leisure1', name: 'Academia' },
          { id: 'leisure2', name: 'Mini mercado' },
        ],
        propertyGallery: [
          { imageUrl: 'https://imovel.com/images/gallery1.jpg', order: 1 },
          { imageUrl: 'https://imovel.com/images/gallery2.jpg', order: 2 },
        ],
        propertyFloorPlanGallery: [
          { imageUrl: 'https://imovel.com/images/floorplan1.jpg', order: 1 },
        ],
        address: {
          street: 'Avenida Morumbi',
          propertyNumber: '3000',
          neighborhood: 'Morumbi',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '05678000',
          complement: 'Apartamento 1502',
          latitude: -23.601,
          longitude: -46.719,
          zone: 'Sul',
        },
      }),
    );
  });
});
