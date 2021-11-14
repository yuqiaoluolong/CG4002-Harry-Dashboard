import React, { useEffect, useState } from 'react';
import cowboy from './move_icon/cowboy.png';
import dab from './move_icon/dab.png';
import jamesbond from './move_icon/jamesbond.png';
import mermaid from './move_icon/mermaid.png';
import push from './move_icon/push.png';
import scarecrow from './move_icon/scarecrow.png';
import snake from './move_icon/snake.png';
import logout from './move_icon/logout.png';
import window from './move_icon/window.png';
import waiting from './move_icon/waiting_incoming_data.png';

const Dancer2 = ({ payload }) => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (payload.topic === 'dancer2') {
      setMessages(messages => [...messages, payload])
    }
  }, [payload])

  return (
    <>
    <div>{messages.length>0 ? (messages[messages.length - 1].message === "cowboy" ? <div><h1>Cowboy</h1><img width={300} src={cowboy} alt='Logo'/></div> : null) : null}</div>
    <div>{messages.length>0 ? (messages[messages.length - 1].message === "dab" ? <div><h1>Dab</h1><img width={300} src={dab} alt='Logo'/></div> : null) : null}</div>
    <div>{messages.length>0 ? (messages[messages.length - 1].message === "jamesbond" ? <div><h1>Jamesbond</h1><img width={300} src={jamesbond} alt='Logo'/></div> : null) : null}</div>
    <div>{messages.length>0 ? (messages[messages.length - 1].message === "mermaid" ? <div><h1>Mermaid</h1><img width={300} src={mermaid} alt='Logo'/></div> : null) : null}</div>
    <div>{messages.length>0 ? (messages[messages.length - 1].message === "push" ? <div><h1>Pushback</h1><img width={300} src={push} alt='Logo'/></div> : null) : null}</div>
    <div>{messages.length>0 ? (messages[messages.length - 1].message === "scarecrow" ? <div><h1>Scarecrow</h1><img width={300} src={scarecrow} alt='Logo'/></div> : null) : null}</div>
    <div>{messages.length>0 ? (messages[messages.length - 1].message === "snake" ? <div><h1>Snake</h1><img width={300} src={snake} alt='Logo'/></div> : null) : null}</div>
    <div>{messages.length>0 ? (messages[messages.length - 1].message === "window" ? <div><h1>Window360</h1><img width={300} src={window} alt='Logo'/></div> : null) : null}</div>
    <div>{messages.length>0 ? (messages[messages.length - 1].message === "logout" ? <div><h1>Logout</h1><img width={300} src={logout} alt='Logo'/></div> : null) : null}</div>
    <div>{messages.length<=0 ? <img width={300} src={waiting} alt='Logo'/> : null}</div>
    </>
  );
}

export default Dancer2;