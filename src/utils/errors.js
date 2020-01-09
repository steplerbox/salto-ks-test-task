
export function parseError(error) {
  if (error.response) {
    if (error.response.status === 401) {
      return 'authError';
    } else if (error.response.status === 403) {
      return 'apiRateLimitError';
    } else if (error.response.status === 404) {
      return 'notFoundError';
    }
  }

  return 'unexpectedError';
}
