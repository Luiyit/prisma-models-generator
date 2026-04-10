import { BASE_MODEL_TEMPLATE } from '../src/templates/baseModel.template';

describe('BASE_MODEL_TEMPLATE', () => {
  it('should be a non-empty string', () => {
    expect(typeof BASE_MODEL_TEMPLATE).toBe('string');
    expect(BASE_MODEL_TEMPLATE.length).toBeGreaterThan(0);
  });

  it('should contain "class Model"', () => {
    expect(BASE_MODEL_TEMPLATE).toContain('class Model');
  });

  it('should contain "getPaginate"', () => {
    expect(BASE_MODEL_TEMPLATE).toContain('getPaginate');
  });
});