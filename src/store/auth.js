import cookies from 'js-cookie';

import { getAuthTokenRequest } from '../api/auth';
import { getAuthenticatedUserRequest } from '../api/github';

export const GET_AUTH_TOKEN_REQUEST = 'GET_AUTH_TOKEN_REQUEST';
export const GET_AUTH_TOKEN_SUCCESS = 'GET_AUTH_TOKEN_SUCCESS';
export const GET_AUTH_TOKEN_FAILURE = 'GET_AUTH_TOKEN_FAILURE';
export const GET_USER_DATA_REQUEST = 'GET_USER_DATA_REQUEST';
export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILURE = 'GET_USER_DATA_FAILURE';
export const CLEAR_AUTH_DATA = 'CLEAR_AUTH_DATA';

export const getAuthToken = code => async dispatch => {
  dispatch({ type: GET_AUTH_TOKEN_REQUEST });

  try {
    const { token } = await getAuthTokenRequest(code);

    dispatch({ type: GET_AUTH_TOKEN_SUCCESS });

    cookies.set('token', token);
  } catch (error) {
    dispatch({
      type: GET_AUTH_TOKEN_FAILURE,
      error: 'authError'
    });
  }
};

export const getAuthenticatedUser = () => async dispatch => {
  dispatch({ type: GET_USER_DATA_REQUEST });

  try {
    const user = await getAuthenticatedUserRequest();

    dispatch({
      type: GET_USER_DATA_SUCCESS,
      payload: {
        user
      }
    });
  } catch (error) {
    dispatch({
      type: GET_USER_DATA_FAILURE,
      error: 'authError'
    });
  }
};

export const login = code => async dispatch => {
  await dispatch(getAuthToken(code));
  dispatch(getAuthenticatedUser());
};

export const logout = () => async dispatch => {
  cookies.remove('token');

  dispatch(clearAuthData());
};

export const clearAuthData = () => ({ type: CLEAR_AUTH_DATA });

export const initialState = {
  isTokenLoading: false,
  isUserLoading: false,
  isAuthenticated: false,
  user: {},
  error: ''
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case CLEAR_AUTH_DATA:
      return initialState;

    case GET_USER_DATA_REQUEST:
      return {
        ...state,
        isUserLoading: true
      };


    case GET_USER_DATA_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isUserLoading: false,
        isAuthenticated: true,
        error: ''
      };

    case GET_USER_DATA_FAILURE:
      return {
        ...state,
        isUserLoading: false,
        error: action.error
      };

    case GET_AUTH_TOKEN_REQUEST:
      return {
        ...state,
        isTokenLoading: true
      };

    case GET_AUTH_TOKEN_SUCCESS:
      return {
        ...state,
        isTokenLoading: false,
        error: ''
      };

    case GET_AUTH_TOKEN_FAILURE:
      return {
        ...state,
        isTokenLoading: false,
        error: action.error
      };

    default:
      return state;
  }
}
