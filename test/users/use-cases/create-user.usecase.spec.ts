import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from 'src/users/application/use-cases/create-user.usecase';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { IUserRepository } from 'src/users/infra/repositories/Iuser.repository';
import { UserEntity } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ExistingUserError } from 'src/users/errors/existing-user.error';

describe('CreateUserUseCase', () => {
  // Use Case that is being tested
  let createUserUseCase: CreateUserUseCase;

  // Repository that this Use Case uses
  let userRepositoryMock: Partial<jest.Mocked<IUserRepository>>;

  // DTO for instances
  const createUserDto: CreateUserDto = {
    name: 'Meruem',
    email: 'Meruem@corretor.com',
    password: 'Komugi123@',
  };

  // Mocking Repository e creating testing playground
  beforeEach(async () => {
    userRepositoryMock = {
      create: jest.fn(),
      findByEmail: jest.fn(),
    };

    // Fake Module
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        { provide: 'IUserRepository', useValue: userRepositoryMock },
      ],
    }).compile();

    createUserUseCase = moduleFixture.get(CreateUserUseCase);
  });

  //--------------------------------------- CREATE ----------------------------------------

  it('Should Create a User Successfully', async () => {
    // User entity to pass into the Create method from User Repository
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const userEntity = UserEntity.create({
      ...createUserDto,
      password: hashedPassword,
    });

    // Mocked User
    const userEntityMock = UserEntity.create({
      ...userEntity,
      id: 'Usuário 1',
    });

    // Defines what value will return as the create method is called
    userRepositoryMock.create?.mockResolvedValueOnce(userEntityMock);

    // Executes the Use Case
    const result = await createUserUseCase.execute(createUserDto);

    // Expects
    expect(userRepositoryMock.create).toHaveBeenCalledWith(
      expect.any(UserEntity),
    );
    expect(userRepositoryMock.create).toHaveBeenCalledTimes(1);

    expect(result).toEqual(
      expect.objectContaining({
        id: 'Usuário 1',
        name: 'Meruem',
        email: 'Meruem@corretor.com',
      }),
    );
  });

  //--------------------------------------- VALIDATIONS ----------------------------------------

  it('Should Not Create a User if He Already Exists', async () => {
    // Fake User that already exists
    const userEntityMock = UserEntity.create({
      ...createUserDto,
      id: 'Usuário 1',
    });

    // Return this fake User
    userRepositoryMock.findByEmail?.mockResolvedValueOnce(userEntityMock);

    // It not includes "await" to be able to use ".rejects" that expects a promise
    const promise = createUserUseCase.execute(createUserDto);

    await expect(promise).rejects.toThrow(ExistingUserError);
    await expect(promise).rejects.toThrow('Usuário já existe');
  });
});
