import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import config from '../../../config';
import {
  initialState,
  getAuthToken,
  getAuthenticatedUser,
  GET_AUTH_TOKEN_REQUEST,
  GET_AUTH_TOKEN_SUCCESS,
  GET_AUTH_TOKEN_FAILURE,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILURE
} from '../auth';

const mockAxios = new AxiosMockAdapter(axios);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockGetCookie = jest.fn();
const mockSetCookie = jest.fn();

jest.mock('js-cookie', () => ({
  __esModule: true,
  default: {
    set: jest.fn().mockImplementation((...args) => {
      mockSetCookie(...args);
    }),
    get: jest.fn().mockImplementation((...args) => {
      mockGetCookie(...args);
    }),
  },
}));


describe('auth actions', () => {
  describe('getAuthToken action', () => {
    afterEach(() => {
      mockAxios.reset();
      mockSetCookie.mockReset();
    });

    it('get auth token SUCCESS', async () => {
      const authCode = 'fakeAuthCode';
      const token = 'fakeToken';

      mockAxios
        .onGet(`${config.authTokenServerUrl}/${authCode}`)
        .reply(200, {token: token});

      const expectedActions = [
        { type: GET_AUTH_TOKEN_REQUEST },
        { type: GET_AUTH_TOKEN_SUCCESS }
      ];

      const store = mockStore(initialState);
      await store.dispatch(getAuthToken(authCode));

      expect(store.getActions()).toEqual(expectedActions);
      expect(mockSetCookie).toHaveBeenCalledWith('token', token);
    });

    it('get auth token FAILURE', async () => {
      const authCode = 'fakeAuthCode';

      mockAxios
        .onGet(`${config.authTokenServerUrl}/${authCode}`)
        .networkError();

      const expectedActions = [
        { type: GET_AUTH_TOKEN_REQUEST },
        { type: GET_AUTH_TOKEN_FAILURE, error: 'authError' }
      ];

      const store = mockStore(initialState);
      await store.dispatch(getAuthToken(authCode));

      expect(store.getActions()).toEqual(expectedActions);
      expect(mockSetCookie).not.toHaveBeenCalled();
    });
  });

  describe('getAuthenticatedUser action', () => {
    afterEach(() => {
      mockAxios.reset();
      mockSetCookie.mockReset();
    });

    it('get authenticated user SUCCESS', async () => {
      const userData = {
        login: 'userLogin',
        name: 'userName',
        avatar_url: 'https://user.avatar',
        type: 'user'
      };

      mockAxios
        .onGet('https://api.github.com/user')
        .reply(200, userData);

      const expectedActions = [
        { type: GET_USER_DATA_REQUEST },
        { type: GET_USER_DATA_SUCCESS, payload: { user: userData } }
      ];

      const store = mockStore(initialState);
      await store.dispatch(getAuthenticatedUser());

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('get auth token FAILURE', async () => {
      mockAxios
        .onGet('https://api.github.com/user')
        .networkError();

      const expectedActions = [
        { type: GET_USER_DATA_REQUEST },
        { type: GET_USER_DATA_FAILURE, error: 'authError' }
      ];

      const store = mockStore(initialState);
      await store.dispatch(getAuthenticatedUser());

      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
