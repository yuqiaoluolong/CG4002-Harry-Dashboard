import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';
import Dancer1 from './dance_move/dancer1';
import Dancer2 from './dance_move/dancer2';
import Dancer3 from './dance_move/dancer3';

const DanceMove = ({ payload }) => {
  const [, setMessages] = useState([])

  useEffect(() => {
    if (payload.topic === "dancer1" || payload.topic === "dancer2" || payload.topic === "dancer3") {
      setMessages(messages => [...messages, payload])
    }
  }, [payload])

  return (
    <><Row gutter={16} justify="center">
        <Col span={8}>
          <Card title="Dancer 1: Haoran" bordered={false} style={{ width: 350 }}>
            <Dancer1 payload={payload}/>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Dancer 2: Shuyi" bordered={false} style={{ width: 350 }}>
            <Dancer2 payload={payload}/>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Dancer 3: Ningmou" bordered={false} style={{ width: 350 }}>
            <Dancer3 payload={payload}/>
          </Card>
        </Col>
      </Row></>
  );
}

export default DanceMove;