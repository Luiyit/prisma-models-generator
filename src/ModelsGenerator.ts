import { GeneratorOptions } from "@prisma/generator-helper";
import TemplateHandler from "./TemplateHandler";
import { Template } from "./types";
import path, { join } from "path";
import { parseEnvValue } from "@prisma/internals";
import fs from "fs";

export const GENERATOR_NAME = 'Prisma Models Generator'

export default class ModelsGenerator {
  static instance: ModelsGenerator;

  constructor(private options: GeneratorOptions) {
    if (ModelsGenerator.instance) {
      throw new Error("Cannot instantiate singleton class directly. Use ModelsGenerator.getInstance().");
    }
  }

  static getInstance(options: GeneratorOptions) {
    if (!ModelsGenerator.instance) {
      ModelsGenerator.instance = new ModelsGenerator(options);
    }
    return ModelsGenerator.instance;
  }

  run() {
    this.saveTypes();
    this.saveBasePrismaClient();
    this.saveBaseModel();
    this.saveModels();    
  }

  saveBasePrismaClient(){
    const basePrismaClient = TemplateHandler.basePrismaClient();
    this.save(basePrismaClient, 'PrismaClient.ts');
  }
  
  saveBaseModel(){
    const baseModelContent = TemplateHandler.baseModel();
    this.save(baseModelContent, 'Model.ts');
  }

  saveTypes(){
    const baseTypesContent = TemplateHandler.baseTypes();
    this.save(baseTypesContent, 'types.ts');
  }

  saveModels(){
    const { models } = this.options.dmmf.datamodel;
    
    for (const model of models) {

      const hasRelations = model.fields.some(field => field.relationName !== undefined);
      const options = {
        removeIncludes: !hasRelations
      };
      
      const classContent = TemplateHandler.call(Template.MODEL, model.name, options);
      this.save(classContent, `${model.name}.ts`);

      const typesContent = TemplateHandler.call(Template.MODEL_TYPES, model.name);
      this.save(typesContent, `/types/${model.name}.ts`);
    }
  }

  save(content: string, fileName: string) {
    const { generator } = this.options;
    const outputDir = parseEnvValue(generator.output!)
    const fullPath = join(outputDir, fileName);
    
    const dirname = path.dirname(fullPath)
    if (fs.existsSync(dirname) === false) {
      fs.mkdirSync(dirname, { recursive: true })
    }
    
    fs.writeFileSync(fullPath, content.trim());
  }
}
