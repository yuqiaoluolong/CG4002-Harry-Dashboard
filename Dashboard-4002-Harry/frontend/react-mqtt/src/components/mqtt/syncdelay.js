import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';
import Dancer1 from './syncdelay/dancer1.js';
import Dancer2 from './syncdelay/dancer2.js';
import Dancer3 from './syncdelay/dancer3.js';

const Delay = ({ payload }) => {
  const [, setMessages] = useState([])

  useEffect(() => {
    if (payload.topic) {
      setMessages(messages => [...messages, payload])
    }
    // if (payload.topic === 'delay2') {
    //     setMessages(messages2 => [...messages2, payload])
    //   }

  }, [payload])

  return (
    <Row gutter={16} justify="center">
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
    </Row>
  );
}

export default Delay;