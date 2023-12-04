//11. 배열 렌더링하기
//12. useRef 로 컴포넌트 안의 변수 만들기
//13. 배열에 항목 추가하기
//14. 배열에 항목 제거하기
//15. 배열에 항목 수정하기
//16. useEffect를 사용하여 마운트/언마운트/업데이트시 할 작업 설정하기
//22. Context API 를 사용한 전역 값 관리
import React, { useContext, useEffect } from "react";
import { UserDispatch } from "./App";

const User = React.memo(function User({ user }) {
  const dispatch = useContext(UserDispatch);
  //onRemove가 "id가 _인 객체를 삭제해라" 라는 역할을 가지고 있음.
  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black'
        }}
        onClick={() => {
          dispatch({type: 'TOGGLE_USER', id: user.id});
        }}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button onClick={() => {
        dispatch({type: 'REMOVE_USER', id: user.id})
      }}>
        삭제
      </button>
    </div>
  );
});

function UserList({ users }) {
  return (
    <div>
      {users.map(user => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
}

export default React.memo(UserList);