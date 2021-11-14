import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import connected from './connection_icon/connected.png';
import disconnected from './connection_icon/disconnected.png';

const Beetle5 = ({ payload }) => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (payload.topic === 'beetle5') {
      setMessages(messages => [...messages, payload])
    }
  }, [payload])

  return (
    <><Card title="beetle5" bordered={false} style={{ width: 125 }}>
      <div>{messages.length>0 ? (messages[messages.length - 1].message==="connected" ? <img width={50} src={connected} alt='Logo'/> : <img width={50} src={disconnected} alt='Logo'/> ) : <img width={50} src={disconnected} alt='Logo'/>}</div>
    </Card></>
  );
}

export default Beetle5;