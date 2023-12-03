//7. useState를 통해 컴포넌트에서 바뀌는 값 관리하기
//20. useReducer 를 사용하여 상태 업데이트 로직 분리하기
import React, { useReducer, useState } from "react";


function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

function Counter(){

  const [number, dispatch] = useReducer(reducer, 0);

  const onIncrease = () => {
    dispatch({ type: 'INCREMENT'});
  }
  const onDecrease = () => {
    dispatch({ type: 'DECREMENT'});
  }

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  )
}

export default Counter;