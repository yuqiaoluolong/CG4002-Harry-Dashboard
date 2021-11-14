import React, { useEffect, useState } from 'react';
function msToTime(duration) {
  var milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24) + 8;

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

const Dancer2 = ({ payload }) => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (payload.topic === 'delay2') {
      setMessages(messages => [...messages, payload])
    }
  }, [payload])

  return (
    <div>timestamp: <h2>{messages.length>0 ? (msToTime(messages[messages.length - 1].message)) : <div>waiting for data</div>}</h2> </div>
  );
}

export default Dancer2;