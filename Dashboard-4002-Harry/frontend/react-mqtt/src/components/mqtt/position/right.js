import React, { useEffect, useState } from 'react';
import dancer1 from './dancer_icon/dancer1.png';
import dancer2 from './dancer_icon/dancer2.png';
import dancer3 from './dancer_icon/dancer3.png';
import loading from './dancer_icon/loading.png';

const Right = ({ payload }) => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (payload.topic === 'right') {
      setMessages(messages => [...messages, payload])
    }
  }, [payload])

  return (
    <>
    <div>{messages.length>0 ? (messages[messages.length - 1].message == "dancer1" ? <img width={200} src={dancer1} alt='Logo'/> : null) : null}</div>
    <div>{messages.length>0 ? (messages[messages.length - 1].message == "dancer2" ? <img width={200} src={dancer2} alt='Logo'/> : null) : null}</div>
    <div>{messages.length>0 ? (messages[messages.length - 1].message == "dancer3" ? <img width={200} src={dancer3} alt='Logo'/> : null) : null}</div>
    <div>{messages.length<=0 ? <img width={200} src={loading} alt='Logo'/> : null}</div>
    </>
  );
}

export default Right;