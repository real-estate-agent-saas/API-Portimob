import {
  WebsiteEntity,
  WebsiteProps,
} from 'src/websites/entities/website.entity';

describe('Website Entity', () => {
  const websiteProps: WebsiteProps = {
    templateConfigId: 'Config do template 2',
    userId: 'Usuário 2',
    template: {
      id: 'Template 2',
      name: 'Template da Diana',
    },
  };

  it('Should Create a Website Entity Sucessfully', () => {
    const websiteEntity = WebsiteEntity.create(websiteProps);

    expect(websiteEntity).toEqual(
      expect.objectContaining({
        templateConfigId: 'Config do template 2',
        userId: 'Usuário 2',
        template: {
          id: 'Template 2',
          name: 'Template da Diana',
        },
      }),
    );
  });
});
