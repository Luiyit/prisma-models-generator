import { BASE_PRISMA_CLIENT_TEMPLATE } from "./templates/basePrismaClient.template";
import { BASE_MODEL_TEMPLATE } from "./templates/baseModel.template";
import { MODEL_TEMPLATE } from "./templates/model.template";
import { BASE_TYPES_TEMPLATE } from "./templates/types.template";
import { MODEL_TYPES_TEMPLATE } from "./templates/modelTypes.template";
// v6 templates
import { BASE_PRISMA_CLIENT_TEMPLATE_V6 } from "./templates/basePrismaClient.v6.template";
import { BASE_MODEL_TEMPLATE_V6 } from "./templates/baseModel.v6.template";
import { MODEL_TEMPLATE_V6 } from "./templates/model.v6.template";
import { BASE_TYPES_TEMPLATE_V6 } from "./templates/types.v6.template";
import { MODEL_TYPES_TEMPLATE_V6 } from "./templates/modelTypes.v6.template";
import { Template } from "./types";

const templates: Record<Template, string> = {
  // v5 templates
  [Template.BASE_PRISMA_CLIENT]: BASE_PRISMA_CLIENT_TEMPLATE,
  [Template.BASE_MODEL]: BASE_MODEL_TEMPLATE,
  [Template.BASE_TYPES]: BASE_TYPES_TEMPLATE,
  [Template.MODEL_TYPES]: MODEL_TYPES_TEMPLATE,
  [Template.MODEL]: MODEL_TEMPLATE,
  // v6 templates
  [Template.BASE_PRISMA_CLIENT_V6]: BASE_PRISMA_CLIENT_TEMPLATE_V6,
  [Template.BASE_MODEL_V6]: BASE_MODEL_TEMPLATE_V6,
  [Template.BASE_TYPES_V6]: BASE_TYPES_TEMPLATE_V6,
  [Template.MODEL_TYPES_V6]: MODEL_TYPES_TEMPLATE_V6,
  [Template.MODEL_V6]: MODEL_TEMPLATE_V6,
}

export interface Option{
  removeIncludes?: boolean;
  prismaVersion?: string;
}

export default class TemplateHandler {

  static call(template: Template, modelName: any, options: Option = {}) {
    const className = `${modelName}Model`;
    const prismaDelegate = `Prisma.${modelName}Delegate`;

    return this.getTemplate(template, options)
      .replace(/#!\{MODEL_NAME\}/g, modelName)
      .replace(/#!\{MODEL_CLIENT_NAME\}/g, modelName)
      .replace(/#!\{CLASS_NAME\}/g, className)
      .replace(/#!\{PRISMA_DELEGATE\}/g, prismaDelegate);
  }

  static getTemplate(templateName: Template, options: Option = {}) {
    let template = templates[templateName];
    if (!template) throw new Error(`Template not found: ${templateName}`);
    if (options.removeIncludes){
      template = template
        .replace(/^\s*include\?:.*\n?/gm, '')
        .replace(/\(include, /g, '(null, ');
    }
    return template;
  }

  static basePrismaClient(prismaVersion?: string) {
    if (prismaVersion && prismaVersion.startsWith('6')) {
      return templates[Template.BASE_PRISMA_CLIENT_V6];
    }
    return templates[Template.BASE_PRISMA_CLIENT];
  }
  
  static baseModel(prismaVersion?: string) {
    if (prismaVersion && prismaVersion.startsWith('6')) {
      return templates[Template.BASE_MODEL_V6];
    }
    return templates[Template.BASE_MODEL];
  }
  
  static baseTypes(prismaVersion?: string) {
    if (prismaVersion && prismaVersion.startsWith('6')) {
      return templates[Template.BASE_TYPES_V6];
    }
    return templates[Template.BASE_TYPES];
  }
}