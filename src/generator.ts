import { generatorHandler, GeneratorOptions, GeneratorManifest } from '@prisma/generator-helper'
import ModelsGenerator, { GENERATOR_NAME } from './ModelsGenerator'

generatorHandler({
	onManifest: (): GeneratorManifest  => {
		return {
			defaultOutput: './_gen/prisma-models',
			prettyName: GENERATOR_NAME,
			requiresGenerators: ['prisma-client-js'],
		}
	},
	onGenerate: async (options: GeneratorOptions) => {
		try {
			await ModelsGenerator.getInstance(options).run()
		} catch (e) {
			console.log(e);
			// handleGenerateError(e)
			return
		}
	},
})

console.info('Handler Registered.')
