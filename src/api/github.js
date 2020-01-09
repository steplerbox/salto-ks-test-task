import axios from 'axios';
import cookies from 'js-cookie';

axios.interceptors.response.use(
  response => response.data,
  error => {
    throw error
  }
);

function getHeaders() {
  const token = cookies.get('token');

  if (!token) {
    return {};
  }

  return {
    Authorization: `token ${token}`
  };
}

export function getRepositoriesRequest(queryString, page, rowsPerPage) {
  const options = {
    params: {
      q: queryString,
      page: page + 1,
      per_page: rowsPerPage,
    },
    headers: getHeaders()
  };

  return axios('https://api.github.com/search/repositories', options);
}

export function getRepositoryRequest(userName, repositoryName) {
  return axios(`https://api.github.com/repos/${userName}/${repositoryName}`, { headers: getHeaders() });
}

export function getAuthenticatedUserRequest() {
  return axios('https://api.github.com/user', { headers: getHeaders() });
}
