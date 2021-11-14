import React from 'react';
import { Card, Button, Form } from 'antd';

const Connection = ({ connect, disconnect, connectBtn }) => {
  const [form] = Form.useForm();
  const record = {
    host: 'broker.emqx.io',
    clientId: `mqttjs_ + ${Math.random().toString(16).substr(2, 8)}`,
    port: 8083,
  };  
  const onFinish = (values) => {
    const { clientId, username, password } = values;
    const options = {
      keepalive: 30,
      protocolId: 'MQTT',
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      will: {
        topic: 'WillMsg',
        payload: 'Connection Closed abnormally..!',
        qos: 0,
        retain: false
      },
      rejectUnauthorized: false
    };
    options.clientId = clientId;
    options.username = username;
    options.password = password;
    connect( );
  };

  const handleConnect = () => {
    form.submit();
  };

  const ConnectionForm = (
    <Form
      layout="vertical"
      name="basic"
      form={form}
      initialValues={record}
      onFinish={onFinish}
    >
      
    </Form>
  )

  return (
    <Card style={{ width: 900 }}

      actions={[
        <Button type="primary" onClick={handleConnect}>{connectBtn}</Button>,

      ]}
    >
      {ConnectionForm}
    </Card>
  );
}

export default Connection;