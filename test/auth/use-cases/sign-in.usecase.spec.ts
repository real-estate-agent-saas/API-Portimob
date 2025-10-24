import { Test, TestingModule } from '@nestjs/testing';
import { ValidateUserUseCase } from 'src/auth/use-cases/validate-user.usecase';
import { UserEntity } from 'src/users/entities/user.entity';
import { IUserRepository } from 'src/users/infra/repositories/Iuser.repository';
import { InactiveUserError } from 'src/users/errors/inactive-user.error';
import { JwtService } from '@nestjs/jwt';
import { SignInUseCase } from 'src/auth/use-cases/sign-in.usecase';
import type { Response } from 'express';
import * as bcrypt from 'bcrypt';

let validateUserUseCase: ValidateUserUseCase;
let signInUseCase: SignInUseCase;
let userRepositoryMock: Partial<jest.Mocked<IUserRepository>>;
let jwtServiceMock: Partial<jest.Mocked<JwtService>>;
let expressResponseMock: Partial<Response>;
let loginData = {
  email: 'hisoka@corretor.com',
  password: 'Teste123@',
};

describe('SignInUseCase', () => {
  beforeEach(async () => {
    userRepositoryMock = {
      findByEmail: jest.fn(),
    };

    jwtServiceMock = {
      sign: jest.fn().mockReturnValue('fake-jwt-token'),
    };

    expressResponseMock = {
      cookie: jest.fn(),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        ValidateUserUseCase,
        SignInUseCase,
        {
          provide: 'IUserRepository',
          useValue: userRepositoryMock,
        },
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
      ],
    }).compile();

    validateUserUseCase = moduleFixture.get(ValidateUserUseCase);
    signInUseCase = moduleFixture.get(SignInUseCase);
  });

  //--------------------- VALIDATES EMAIL & PASSWORD -----------------------

  it('Should Validate an User Successfully', async () => {
    // Password hashed to simulate as a saved password on DB
    const hashedPassword = await bcrypt.hash(loginData.password, 10);

    // Return a user if provided email match with the one on DB
    const userMock = UserEntity.create({
      id: 'Usuário 3',
      name: 'Hisoka - O Paiaço',
      email: 'hisoka@corretor.com',
      password: hashedPassword,
    });
    userRepositoryMock.findByEmail?.mockResolvedValueOnce(userMock);

    // Calls Use Case
    const result = await validateUserUseCase.excecute(
      loginData.email,
      loginData.password,
    );

    expect(result).toEqual(
      expect.objectContaining({
        id: 'Usuário 3',
        name: 'Hisoka - O Paiaço',
        email: 'hisoka@corretor.com',
        password: undefined,
        isActive: true,
      }),
    );
  });

  it('Should Not Validate User if His Account is Inactive', async () => {
    // Password hashed to simulate as a saved password on DB
    const hashedPassword = await bcrypt.hash(loginData.password, 10);

    // Return a user if provided email match with the one on DB
    const userMock = UserEntity.create({
      id: 'Usuário 3',
      name: 'Hisoka - O Paiaço',
      email: 'hisoka@corretor.com',
      password: hashedPassword,
    });
    userMock.deactivate();
    userRepositoryMock.findByEmail?.mockResolvedValueOnce(userMock);

    await expect(
      validateUserUseCase.excecute(loginData.email, loginData.password),
    ).rejects.toThrow(InactiveUserError);
  });

  //--------------------- GENERATES JWT TOKEN -----------------------

  it('Should Generate a JWT Token Successfully', async () => {
    // Arrange
    const userEntity = UserEntity.create({
      id: 'Usuário 3',
      name: 'Hisoka - O Paiaço',
      email: 'hisoka@corretor.com',
      password: 'Teste123@',
    });

    // Act
    const result = await signInUseCase.excecute(
      userEntity,
      expressResponseMock as Response,
    );

    // Assert
    expect(jwtServiceMock.sign).toHaveBeenCalledWith({
      sub: userEntity.id,
      email: userEntity.email,
      name: userEntity.name,
    });

    expect(expressResponseMock.cookie).toHaveBeenCalledWith(
      'access_token',
      'fake-jwt-token',
      expect.objectContaining({
        httpOnly: true,
        sameSite: 'lax',
        maxAge: expect.any(Number),
      }),
    );

    expect(result).toEqual({
      access_token: 'fake-jwt-token',
    });
  });
});
