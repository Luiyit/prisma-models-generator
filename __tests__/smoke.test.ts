import { ModelsGenerator } from '../src/ModelsGenerator';

describe('Smoke Test', () => {
  it('should confirm Jest is working', () => {
    const generator = new ModelsGenerator();
    expect(generator).toBeDefined();
  });
});