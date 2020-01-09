import { getRepositoryRequest } from '../api/github';
import { parseError } from '../utils/errors';

const GET_REPOSITORY_REQUEST = 'GET_REPOSITORY_REQUEST';
const GET_REPOSITORY_SUCCESS = 'GET_REPOSITORY_SUCCESS';
const GET_REPOSITORY_FAILURE = 'GET_REPOSITORY_FAILURE';
const CLEAR_REPOSITORY_DATA = 'CLEAR_REPOSITORY_DATA';

export const getRepository = (userName, repositoryName) => async dispatch => {
  dispatch({ type: GET_REPOSITORY_REQUEST });

  try {
    const responseData = await getRepositoryRequest(userName, repositoryName);

    dispatch({
      type: GET_REPOSITORY_SUCCESS,
      payload: {
        data: responseData,
        owner: responseData.owner
      }
    });
  } catch (error) {
    dispatch({
      type: GET_REPOSITORY_FAILURE,
      error: parseError(error)
    })
  }
};

export const clearRepositoryData = () => ({ type: CLEAR_REPOSITORY_DATA });

const initialState = {
  isLoading: false,
  data: {},
  owner: {},
  error: ''
};

export default function repository(state = initialState, action) {
  switch (action.type) {
    case CLEAR_REPOSITORY_DATA:
      return initialState;

    case GET_REPOSITORY_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case GET_REPOSITORY_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        error: ''
      };

    case GET_REPOSITORY_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    default:
      return state;
  }
}
