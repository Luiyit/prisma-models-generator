import { BASE_PRISMA_CLIENT_TEMPLATE } from "./templates/basePrismaClient.template";
import { BASE_MODEL_TEMPLATE } from "./templates/baseModel.template";
import { MODEL_TEMPLATE } from "./templates/model.template";
import { BASE_TYPES_TEMPLATE } from "./templates/types.template";
import { Template } from "./types";

// @ts-ignore
import changeCase from 'change-object-case';

const templates: Record<Template, string> = {
  [Template.BASE_PRISMA_CLIENT]: BASE_PRISMA_CLIENT_TEMPLATE,
  [Template.BASE_MODEL]: BASE_MODEL_TEMPLATE,
  [Template.BASE_TYPES]: BASE_TYPES_TEMPLATE,
  [Template.MODEL]: MODEL_TEMPLATE,
}

export default class TemplateHandler {

  static call(template: Template, modelName: any) {
    const className = `${modelName}Model`;
    const modelClientName = changeCase.camelCase(modelName);
    const prismaDelegate = `Prisma.${modelName}Delegate`;

    return templates[template]
      .replace(/#!\{MODEL_NAME\}/g, modelName)
      .replace(/#!\{MODEL_CLIENT_NAME\}/g, modelClientName)
      .replace(/#!\{CLASS_NAME\}/g, className)
      .replace(/#!\{PRISMA_DELEGATE\}/g, prismaDelegate);
  }

  static basePrismaClient() {
    return templates[Template.BASE_PRISMA_CLIENT];
  }
  
  static baseModel() {
    return templates[Template.BASE_MODEL];
  }
  
  static baseTypes() {
    return templates[Template.BASE_TYPES];
  }
}