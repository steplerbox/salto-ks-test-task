import { getRepositoriesRequest } from '../api/github';
import { parseError } from '../utils/errors';

const CHANGE_QUERY_STRING = 'CHANGE_QUERY_STRING';
const CHANGE_PAGE = 'CHANGE_PAGE';
const GET_REPOSITORIES_REQUEST = 'GET_REPOSITORIES_REQUEST';
const GET_REPOSITORIES_SUCCESS = 'GET_REPOSITORIES_SUCCESS';
const GET_REPOSITORIES_FAILURE = 'GET_REPOSITORIES_FAILURE';

export const changeQueryString = queryString => ({
  type: CHANGE_QUERY_STRING,
  payload: {
    queryString
  }
});

export const changePage = page => ({
  type: CHANGE_PAGE,
  payload: {
    page
  }
});

export const getRepositories = (queryString, page, rowsPerPage) => async dispatch => {
  dispatch({ type: GET_REPOSITORIES_REQUEST });

  try {
    if (!queryString) {
      dispatch({
        type: GET_REPOSITORIES_SUCCESS,
        payload: {
          totalCount: 0,
          items: []
        }
      });
    } else {
      const responseData = await getRepositoriesRequest(queryString, page, rowsPerPage);

      dispatch({
        type: GET_REPOSITORIES_SUCCESS,
        payload: {
          totalCount: responseData.total_count,
          items: responseData.items
        }
      });
    }
  } catch (error) {
    dispatch({
      type: GET_REPOSITORIES_FAILURE,
      error: parseError(error)
    });
  }
};

const initialState = {
  queryString: '',
  isLoading: false,
  totalCount: 0,
  page: 0,
  rowsPerPage: 10,
  items: [],
  error: ''
};

export default function repositories(state = initialState, action) {
  switch (action.type) {
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.payload.page
      };

    case CHANGE_QUERY_STRING:
      return {
        ...state,
        queryString: action.payload.queryString
      };

    case GET_REPOSITORIES_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case GET_REPOSITORIES_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        error: ''
      };

    case GET_REPOSITORIES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    default:
      return state;
  }
}
