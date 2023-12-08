import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { 
  createAsyncDispatcher, 
  createAsyncHandler, 
  initialAsyncState 
} from "./asyncActionUtils";
import * as api from './api'



//UserContext 에서 사용할 기본 상태
const initialState = {
  users: initialAsyncState,
  user: initialAsyncState
}



//State용 Context와 Dispatch용 Context 따로 만들어주기
const usersHandler = createAsyncHandler('GET_USERS', 'api.getUsers')
const userHandler = createAsyncHandler('GET_USER', 'api.getUser')

// 위에서 만든 객체 / 유틸 함수들을 사용하여 리듀서 작성
function usersReducer(state, action) {
  switch (action.type) {
    case 'GET_USERS':
    case 'GET_USERS_SUCCESS':
    case 'GET_USERS_ERROR':
      return usersHandler(state, action);
    case 'GET_USER':
    case 'GET_USER_SUCCESS':
    case 'GET_USER_ERROR':
      return userHandler(state, action);
    default:
      throw new Error(`Unhanded action type: ${action.type}`);
  }
}

//위에서 선언한 두가지 Context 들의 Provider로 감싸주는 컴포넌트
export function UsersProvider({ children }) {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  return (
    <userHandler.Provider value={state}>
      <userHandler.Provider value={dispatch}>
        {children}
      </userHandler.Provider>
    </userHandler.Provider>
  )
};

// State를 쉽게 조회 할 수 있게 해주는 커스텀 Hook

// export function useUsersState() {
//   const state = useContext(UsersStateContext);
//   if (!state) {
//     throw new Error('Cannot find UsersProvider');
//   }
//   return state;
// }


// // Dispatch를 쉽게 사용 할 수 있게 해주는 커스텀 Hook
// export function useUsersDispatch() {
//   const dispatch = useContext(UsersDispatchContext);
//   if (!dispatch) {
//     throw new Error('Cannot find Users');
//   }
//   return dispatch;
// }


// export async function getUsers(dispatch) {
//   dispatch({ type: 'GET_USERS' });
//   try {
//     const response = await axios.get(
//       `https://jsonplaceholder.typicode.com/users`
//     );
//     dispatch({ type: 'GET_USERS_SUCCESS', data: response.data });
//   } catch (e) {
//     dispatch({ type: 'GET_USERS_ERROR', error: e });
//   }
// }

// export async function getUser(dispatch, id) {
//   dispatch({ type: 'GET_USER' });
//   try {
//     const response = await axios.get(
//       `https://jsonplaceholder.typicode.com/users/${id}`
//     );
//     dispatch({ type: 'GET_USER_SUCCESS', data: response.data });
//   } catch (e) {
//     dispatch({ type: 'GET_USER_ERROR', error: e });
//   }
// }