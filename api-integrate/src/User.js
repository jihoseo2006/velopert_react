import React from 'react'
import axios from 'axios'
import { useAsync } from 'react-use'

async function getUser(id) {
  const url = `https://jsonplaceholder.typicode.com/users/${id}`
  const response = await axios.get(url)
  return response.data
}

function User({ id }) {
  const state = useAsync(() => getUser(id), [id])
  const { loading, error, value: user } = state

  if (loading) return <div>로딩중..</div>
  if (error) return <div>Error Occured: {error.message}</div>
  if (!user) return null
  return (
    <div>
      <h2>{user.username}</h2>
      <p>
        <b>Email:</b> {user.email}
      </p>
    </div>
  )
}

export default User