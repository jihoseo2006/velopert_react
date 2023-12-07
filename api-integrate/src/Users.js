import React, { useReducer, useEffect, useState } from 'react'
import axios from 'axios';
import { useAsyncRetry } from 'react-use';
import User from './User';

async function getUsers() {
  const url = 'https://jsonplaceholder.typicode.com/users'
  const response = await axios.get(url)
  return response.data
}


const Users = () => {
  const [userId, setUserId] = useState(null)
  const state = useAsyncRetry(getUsers)
  const { loading, error, value: users, retry } = state

  if (loading) return <div>로딩중..</div>
  if (error) return <div>Error Occured: {error.message}</div>
  if (!users) return <button onClick={retry}>불러오기</button>
  return (
    <>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => setUserId(user.id)}
            style={{ cursor: 'pointer' }}
          >
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={retry}>again</button>
      {userId && <User id={userId} />}
    </>
  )
}

export default Users