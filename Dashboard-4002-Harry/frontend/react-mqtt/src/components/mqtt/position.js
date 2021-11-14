import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';

const Position = ({ payload }) => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (payload.topic === 'position') {
      setMessages(messages => [...messages, payload])
    }
  }, [payload])

  return (
    <Row gutter={16} justify="center">
        <Col span={8}>
            <Card title="Left" bordered={false} style={{ width: 350 }}>
              <div>{messages.length>0 ? (messages[messages.length - 1].message === "1 2 3" ? <div><h1>Dancer1: Haoran</h1></div> : null) : null}</div>
              <div>{messages.length>0 ? (messages[messages.length - 1].message === "1 3 2" ? <div><h1>Dancer1: Haoran</h1></div> : null) : null}</div>
              <div>{messages.length>0 ? (messages[messages.length - 1].message === "2 1 3" ? <div><h1>Dancer2: Shuyi</h1></div> : null) : null}</div>
              <div>{messages.length>0 ? (messages[messages.length - 1].message === "2 3 1" ? <div><h1>Dancer2: Shuyi</h1></div> : null) : null}</div>
              <div>{messages.length>0 ? (messages[messages.length - 1].message === "3 1 2" ? <div><h1>Dancer3: Ningmou</h1></div> : null) : null}</div>
              <div>{messages.length>0 ? (messages[messages.length - 1].message === "3 2 1" ? <div><h1>Dancer3: Ningmou</h1></div> : null) : null}</div>
              <div>{messages.length===0 ?  <h1>Unkown dancer, waiting for data</h1> : null}</div>
            </Card>
        </Col>
        <Col span={8}>
            <Card title="Center" bordered={false} style={{ width: 350 }}>
              <div>{messages.length>0 ? (messages[messages.length - 1].message === "1 2 3" ? <div><h1>Dancer2: Shuyi</h1></div> : null) : null}</div>
              <div>{messages.length>0 ? (messages[messages.length - 1].message === "1 3 2" ? <div><h1>Dancer3: Ningmou</h1></div> : null) : null}</div>
              <div>{messages.length>0 ? (messages[messages.length - 1].message === "2 1 3" ? <div><h1>Dancer1: Haoran</h1></div> : null) : null}</div>
              <div>{messages.length>0 ? (messages[messages.length - 1].message === "2 3 1" ? <div><h1>Dancer3: Ningmou</h1></div> : null) : null}</div>
              <div>{messages.length>0 ? (messages[messages.length - 1].message === "3 1 2" ? <div><h1>Dancer1: Haoran</h1></div> : null) : null}</div>
              <div>{messages.length>0 ? (messages[messages.length - 1].message === "3 2 1" ? <div><h1>Dancer2: Shuyi</h1></div> : null) : null}</div>
              <div>{messages.length===0 ?  <h1>Unkown dancer, waiting for data</h1> : null}</div>
            </Card>
        </Col>
        <Col span={8}>
            <Card title="Right" bordered={false} style={{ width: 350 }}>
              <div>{messages.length>0 ? (messages[messages.length - 1].message === "1 2 3" ? <div><h1>Dancer3: Ningmou</h1></div> : null) : null}</div>
              <div>{messages.length>0 ? (messages[messages.length - 1].message === "1 3 2" ? <div><h1>Dancer2: Shuyi</h1></div> : null) : null}</div>
              <div>{messages.length>0 ? (messages[messages.length - 1].message === "2 1 3" ? <div><h1>Dancer3: Ningmou</h1></div> : null) : null}</div>
              <div>{messages.length>0 ? (messages[messages.length - 1].message === "2 3 1" ? <div><h1>Dancer1: Haoran</h1></div> : null) : null}</div>
              <div>{messages.length>0 ? (messages[messages.length - 1].message === "3 1 2" ? <div><h1>Dancer2: Shuyi</h1></div> : null) : null}</div>
              <div>{messages.length>0 ? (messages[messages.length - 1].message === "3 2 1" ? <div><h1>Dancer1: Haoran</h1></div> : null) : null}</div>
              <div>{messages.length===0 ?  <h1>Unkown dancer, waiting for data</h1> : null}</div>
            </Card>
        </Col>
    </Row>
  );
}

export default Position;