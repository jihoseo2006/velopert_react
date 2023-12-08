// 이 함수는 파라미터로 액션의 타입(예: 'GET_USER') 과 Promise 를 만들어주는 함수를 받아온다.

export function createAsyncDispatcher(type, promiseFn) {
  // 성공, 실패에 대한 액션 타입 문자열을 준비한다.
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  //새로운 함수를 만들자.
  // ...rest를 사용하여 나머지 파라미터를 rest 배열에 담는다.
  async function actionHandler(dispatch, ...rest) {
    dispatch({ type });
    try {
      const data = await promiseFn(...rest); // rest 배열을 spread로 넣어준다.
      dispatch({
        type: SUCCESS,
        data
      }); // success
    } catch (e) {
      dispatch({
        type: ERROR,
        error: e
      }); // failed
    }
  }

  return actionHandler; // 만든 함수를 반환한다.

}


export const initialAsyncState = {
  loading: false,
  data: null,
  error: null
};

// 로딩중일때 바뀔 상태 객체

const loadingState = {
  loading: true,
  data: null,
  error: null
}

const success = data => ({
  loading: false,
  data,
  error: null
})

const error = data => ({
  loading: false,
  data: null,
  error: null
})

// 세 가지 액션을 처리하는 리듀서를 만들자.
// type은 액션타입, key는 리듀서에서 사용할 필드 이름임 (예 : user, users)

export function createAsyncHandler(type, key) {
  // 성공, 실패에대한 액션 타입 문자열을 준비한다.
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  //함수를 새로 만들어서
  function handler(state, action) {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: loadingState
        }
      case SUCCESS:
        return {
          ...state,
          [key]: success(action.data)
        }
      case ERROR:
        return {
          ...state,
          [key]: error(action.error)
        }
      default:
        return state;
    }
  }

  //반환한다.
  return handler;

}

