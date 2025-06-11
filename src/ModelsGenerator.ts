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
    // Detect Prisma version from generator config or from @prisma/client in user's project
    this.prismaVersion = this.detectPrismaVersion();
  }

  prismaVersion: string = '5';

  detectPrismaVersion(): string {
    // Try to get from generator config
    const configVersion = this.options.generator.config.prismaVersion;
    if (configVersion && typeof configVersion === 'string' && configVersion !== 'auto') {
      return configVersion;
    }
    // Try to resolve @prisma/client from project's node_modules
    try {
      const projectRoot = process.cwd();
      const pkg = require(require.resolve('@prisma/client/package.json', { paths: [projectRoot] }));
      return pkg.version;
    } catch {
      return '5'; // fallback
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
    const basePrismaClient = TemplateHandler.basePrismaClient(this.prismaVersion);
    this.save(basePrismaClient, 'PrismaClient.ts');
  }
  
  saveBaseModel(){
    const baseModelContent = TemplateHandler.baseModel(this.prismaVersion);
    this.save(baseModelContent, 'Model.ts');
  }

  saveTypes(){
    const baseTypesContent = TemplateHandler.baseTypes(this.prismaVersion);
    this.save(baseTypesContent, 'types.ts');
  }

  saveModels(){
    const { models } = this.options.dmmf.datamodel;
    for (const model of models) {
      const hasRelations = model.fields.some(field => field.relationName !== undefined);
      const options = {
        removeIncludes: !hasRelations,
        prismaVersion: this.prismaVersion
      };
      // Select template according to version
      const modelTemplate = this.prismaVersion.startsWith('6') ? Template.MODEL_V6 : Template.MODEL;
      const modelTypesTemplate = this.prismaVersion.startsWith('6') ? Template.MODEL_TYPES_V6 : Template.MODEL_TYPES;
      const classContent = TemplateHandler.call(modelTemplate, model.name, options);
      this.save(classContent, `${model.name}.ts`);
      const typesContent = TemplateHandler.call(modelTypesTemplate, model.name, options);
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
    
    fs.writeFileSync(fullPath, content.trim() + '\n');
  }
}
