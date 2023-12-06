import React, { useReducer, useEffect, useState } from 'react'
import axios from 'axios';
import useAsync from './useAsync';
import User from './User';

async function getUsers() {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  return response.data;
}


function Users() {
  const [userId, setUserId] = useState(null);
  const [state, refatch] = useAsync(getUsers, []);

  const {loading, data: users, error} = state; // state.data 를 users 키워드로 조회

  if (loading) return <div>로딩중....</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return <button onClick={refatch}>불러오기</button>;
  return (
    <>
      <ul>
        {users.map(user => (
          <li 
            key={user.id}
            onClick={() => setUserId(user.id)}
            style={{cursor: 'pointer'}}
          >
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={refatch}>다시 불러오기</button>
      {userId && <User id={userId} />}
    </>
  );
}

export default Users;