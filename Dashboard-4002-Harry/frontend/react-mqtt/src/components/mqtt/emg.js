import React, { useEffect, useState } from 'react';
import { Card } from 'antd';

const EMG = ({ payload }) => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (payload.topic === 'emg') {
      setMessages(messages => [...messages, payload])
    }
  }, [payload])

  return (
    <Card title="Notification for dancers: " bordered={false} style={{ width: 430 }}>
        <div>{messages.length>0 ? (messages[messages.length - 1].message === "not tired" ? <div><h1>Good.</h1></div> : null) : null}</div>
        <div>{messages.length>0 ? (messages[messages.length - 1].message === "slow" ? <div><h1>Slow down!</h1></div> : null) : null}</div>
        <div>{messages.length>0 ? (messages[messages.length - 1].message === "tired" ? <div><h1>Take A Break!</h1></div> : null) : null}</div>
    </Card>
  );
}

export default EMG;