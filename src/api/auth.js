import axios from 'axios';

import config from '../../config';

export const getAuthTokenRequest = code => {
  return axios(`${config.authTokenServerUrl}/${code}`)
    .then(response => {
      if (response && response.error) {
        throw response.error;
      }

      return response;
    });
};
