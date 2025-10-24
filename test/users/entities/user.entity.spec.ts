import { UserEntity, UserProps } from 'src/users/entities/user.entity';

describe('User Entity', () => {
  const baseProps: UserProps = {
    name: 'Chrollo',
    email: 'Chrollo@corretor.com',
    password: 'SenhaTeste123@',
  };

  //--------------------- CREATE ------------------------
  it('Should Create a User', () => {
    const user = UserEntity.create(baseProps);

    expect(user).toBeDefined;
    expect(user).toBeInstanceOf(UserEntity);
  });

  //--------------------- ACTIVATE ------------------------
  it('Should Activate a User', () => {
    const user = UserEntity.create({
      name: baseProps.name,
      email: baseProps.email,
      password: baseProps.password,
      isActive: false,
    });

    expect(user.isActive).toBeFalsy;
    user.activate();
    expect(user.isActive).toBeTruthy;
  });

  //--------------------- DEACTIVATE ------------------------
  it('Should Activate a User', () => {
    const user = UserEntity.create({
      name: baseProps.name,
      email: baseProps.email,
      password: baseProps.password,
      isActive: false,
    });

    expect(user.isActive).toBeFalsy;
    user.deactivate();
    expect(user.isActive).toBeTruthy;
  });

  //--------------------- VALIDATIONS ------------------------
});
