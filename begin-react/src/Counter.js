//7. useState를 통해 컴포넌트에서 바뀌는 값 관리하기

import React, { useState } from "react";

function Counter(){

  const [number, setNumber] = useState(0)

  const onIncrease = () => {
    setNumber(prevNumber => prevNumber + 1);
  }
  const onDecrease = () => {
    setNumber(prevNumber => prevNumber - 1);
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