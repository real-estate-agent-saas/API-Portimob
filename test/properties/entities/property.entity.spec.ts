import {
  PropertyEntity,
  PropertyProps,
} from 'src/properties/entities/property.entity';
import { InvalidPropertyError } from 'src/properties/errors/invalid-property.error';

describe('Property Entity', () => {
  //----------------------------- Basic data to create properties --------------------------
  const baseProps: PropertyProps = {
    title: 'Casa da Rafaelle',
    description: 'Casa grande com piscina',
    area: 250,
    price: 1200000,
    roomsQty: 4,
    bathroomsQty: 3,
    parkingSpacesQty: 2,
  };
  const baseUserId = 'user-123';

  //------------------------------------- CREATE ---------------------------------

  it('Should create a Property', () => {
    const property = PropertyEntity.create(baseProps, baseUserId);
    // Expect to match defined values
    expect(property).toEqual(
      expect.objectContaining({
        title: 'Casa da Rafaelle',
        description: 'Casa grande com piscina',
        area: 250,
        price: 1200000,
        roomsQty: 4,
        bathroomsQty: 3,
        parkingSpacesQty: 2,
      }),
    );

    expect(property.userId).toBeDefined;
    expect(property.isActive).toBeTruthy;
    expect(property.isFeatured).toBeFalsy;
  });

  //------------------------------------- UPDATE ---------------------------------

  it('Should update a Property', () => {
    // Update data
    const updateProps: Partial<PropertyProps> = {
      description: 'Casa pequena e fede',
      area: 10,
      price: 20,
      roomsQty: 0,
      bathroomsQty: 1,
      parkingSpacesQty: 20,
      propertyTypology: { id: 'ID 1', name: 'Casa' },
    };

    const property = PropertyEntity.create(baseProps, baseUserId);
    property.update(updateProps, baseUserId);

    expect(property).toEqual(
      expect.objectContaining({
        title: 'Casa da Rafaelle',
        description: 'Casa pequena e fede',
        area: 10,
        price: 20,
        roomsQty: 0,
        bathroomsQty: 1,
        parkingSpacesQty: 20,
        propertyTypology: { id: 'ID 1', name: 'Casa' },
        isActive: true,
      }),
    );
  });

  //------------------------------------- ACTIVATE ---------------------------------

  it('Should activate a Property', () => {
    const property = PropertyEntity.create(
      { title: baseProps.title, isActive: false },
      baseUserId,
    );

    expect(property.isActive).toBeFalsy;
    property.activate();
    expect(property.isActive).toBeTruthy();
  });

  //------------------------------------- DEACTIVATE ---------------------------------

  it('Should deactivate a Property', () => {
    const property = PropertyEntity.create(
      {
        title: baseProps.title,
        isActive: true,
      },
      baseUserId,
    );

    expect(property.isActive).toBeTruthy;
    property.deactivate();
    expect(property.isActive).toBeFalsy;
  });

  //------------------------------------- VALIDATIONS ---------------------------------

  it('Should validate a Property with the correct Error Types', () => {
    // Title Error
    try {
      PropertyEntity.create({ title: 'a' }, baseUserId);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidPropertyError);
      expect(error.message).toContain(
        'O título deve ter pelo menos 3 caracteres',
      );
    }

    // Price error
    try {
      PropertyEntity.create({ title: baseProps.title, price: -20 }, baseUserId);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidPropertyError);
      expect(error.message).toContain('O preço não pode ser negativo');
    }
  });
});
