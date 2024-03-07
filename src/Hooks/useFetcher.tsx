import { useCallback, useEffect, useReducer } from 'react';

enum EActionTypes {
  REQUEST = 'REQUEST',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

type GraphQLResponse<T> = {
  data?: T;
  errors?: any[];
};

export type TFetchState<T> = {
  isLoading: boolean;
  data?: T;
  error?: any;
};

type TFetchAction<T> =
  | { type: EActionTypes.REQUEST }
  | { type: EActionTypes.SUCCESS; payLoad: T }
  | { type: EActionTypes.FAILURE; payLoad: any };

function fetchReducer<T>(state: TFetchState<T>, action: TFetchAction<T>): TFetchState<T> {
  switch (action.type) {
    case EActionTypes.REQUEST:
      return { ...state, isLoading: true };
    case EActionTypes.SUCCESS:
      return { isLoading: false, data: action.payLoad, error: undefined };
    case EActionTypes.FAILURE:
      return { isLoading: false, data: undefined, error: action.payLoad };
    default:
      return state;
  }
}

const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/`;

const useFetcher = <T,>(query: any): TFetchState<T> => {
  const initialState: TFetchState<T> = {
    isLoading: true,
    data: null,
    error: undefined,
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const fetchQuery = useCallback(async () => {
    if (!query) {
      dispatch({
        type: EActionTypes.REQUEST,
      });

      return;
    }

    const abortController = new AbortController();
    const { signal } = abortController;

    dispatch({
      type: EActionTypes.REQUEST,
    });

    try {
      const response = await fetch(fetchUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_TOKEN}`,
        },
        body: JSON.stringify({ query }),
        signal,
      });

      const { data, errors }: GraphQLResponse<T> = await response.json();

      dispatch({
        type: EActionTypes.SUCCESS,
        payLoad: data,
      });

      if (errors) {
        dispatch({
          type: EActionTypes.FAILURE,
          payLoad: errors,
        });
      }

      if (!data) {
        dispatch({
          type: EActionTypes.FAILURE,
          payLoad: 'No data returned',
        });
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        dispatch({ type: EActionTypes.FAILURE, payLoad: error });
      }
    }

    return () => {
      abortController.abort();
    };
  }, [query]);

  useEffect(() => {
    let abortCleanup: () => void;

    fetchQuery().then((cleanup) => {
      abortCleanup = cleanup;
    });

    return () => {
      if (abortCleanup) {
        abortCleanup();
      }
    };
  }, [fetchQuery]);

  return state as TFetchState<T>;
};

export default useFetcher;
