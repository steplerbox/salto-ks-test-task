import { parseError } from './errors';

describe('parse error utility', () => {
  it('should parse auth error', () => {
    const error = { response: { status: 401 } };

    expect(parseError(error)).toBe('authError');
  });

  it('should parse API rate limit error error', () => {
    const error = { response: { status: 403 } };

    expect(parseError(error)).toBe('apiRateLimitError');
  });

  it('should parse not found error', () => {
    const error = { response: { status: 404 } };
    expect(parseError(error)).toBe('notFoundError');
  });

  it('should parse unexpected error', () => {
    const error = { response: { status: 400 } };

    expect(parseError(error)).toBe('unexpectedError');
  });
});
