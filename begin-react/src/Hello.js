import React from 'react';



function Hello(props){
  return <div style={{color: props.color}}>안녕하세요~ {props.name} 입니다!</div>
}

export default Hello;
