import { TemplateEntity } from 'src/templates/entities/template.entity';

export const SEED_TEMPLATES: Omit<TemplateEntity, 'id'>[] = [
  {
    templateCode: 'default',
    name: 'Template Diana',
    description:
      'Template moderno e elegante com banner rotativo de imóveis destaque',
    version: 1,
    previewImage:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    isActive: true,
    plan: 'Free',
    features: [
      'Banner Rotativo',
      'Página de Anúncio',
      'Filtro de Imóveis',
      'Busca por Título',
      'Sessão Destaque',
      'WhatsApp Flutuante',
    ],
    fields: [
      {
        key: 'mainColor',
        label: 'Cor Principal',
        type: 'color',
        defaultValue: '#0055ff',
        editable: true,
        group: 'Theme',
      },
      {
        key: 'bannerText',
        label: 'Texto do Banner',
        type: 'string',
        defaultValue: 'Encontre seu lar dos sonhos',
        editable: true,
        group: 'Hero',
      },
      {
        key: 'showFeatured',
        label: 'Exibir Destaques',
        type: 'boolean',
        defaultValue: true,
        editable: true,
        group: 'List',
      },
      {
        key: 'footerNote',
        label: 'Rodapé',
        type: 'text',
        defaultValue: '© 2025 Sua Imobiliária',
        editable: true,
        group: 'Footer',
      },
    ],
  },
  {
    templateCode: 'modern',
    name: 'Template Modern',
    description: 'Template com thema escuro futurista',
    version: 1,
    previewImage:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    isActive: true,
    plan: 'Premium',
    features: [
      'Banner Rotativo',
      'Página de Anúncio',
      'Filtro de Imóveis',
      'Busca por Título',
      'Sessão Destaque',
      'WhatsApp Flutuante',
    ],
    fields: [
      {
        key: 'mainColor',
        label: 'Cor Principal',
        type: 'color',
        defaultValue: '#ff6600',
        editable: true,
        group: 'Aparência',
      },
      {
        key: 'heroImage',
        label: 'Imagem do Hero',
        type: 'image',
        defaultValue: '/assets/hero-default.jpg',
        editable: true,
        group: 'Hero',
      },
      {
        key: 'ctaText',
        label: 'Texto do Botão',
        type: 'string',
        defaultValue: 'Fale no WhatsApp',
        editable: true,
        group: 'Hero',
      },
      {
        key: 'cardsPerRow',
        label: 'Cards por Linha',
        type: 'number',
        defaultValue: 3,
        editable: true,
        group: 'Listagem',
      },
    ],
  },
];
