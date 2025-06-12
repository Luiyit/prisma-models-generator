export enum Template {
  BASE_PRISMA_CLIENT = 'base_prisma_client',
  BASE_MODEL = 'base_model',
  BASE_TYPES = 'base_types',
  MODEL_TYPES = 'model_types',
  MODEL = 'model',
  // v6 templates
  BASE_PRISMA_CLIENT_V6 = 'base_prisma_client_v6',
  BASE_MODEL_V6 = 'base_model_v6',
  BASE_TYPES_V6 = 'base_types_v6',
  MODEL_TYPES_V6 = 'model_types_v6',
  MODEL_V6 = 'model_v6',
}

export type SupportedVersion = 'V5' | 'V6';

export type TemplateKey =
  | 'BASE_PRISMA_CLIENT'
  | 'BASE_MODEL'
  | 'BASE_TYPES'
  | 'MODEL_TYPES'
  | 'MODEL';

export const VersionTemplates: Record<SupportedVersion, Record<TemplateKey, Template>> = {
  V5: {
    BASE_PRISMA_CLIENT: Template.BASE_PRISMA_CLIENT,
    BASE_MODEL: Template.BASE_MODEL,
    BASE_TYPES: Template.BASE_TYPES,
    MODEL_TYPES: Template.MODEL_TYPES,
    MODEL: Template.MODEL,
  },
  V6: {
    BASE_PRISMA_CLIENT: Template.BASE_PRISMA_CLIENT_V6,
    BASE_MODEL: Template.BASE_MODEL_V6,
    BASE_TYPES: Template.BASE_TYPES_V6,
    MODEL_TYPES: Template.MODEL_TYPES_V6,
    MODEL: Template.MODEL_V6,
  },
};