import React, { createContext, useEffect, useState } from 'react';
import Connection from './connection';
import Publisher from './publisher';
import Subscriber from './subscriber';
import Beetle1 from './beetle_connection/beetle1';
import Beetle2 from './beetle_connection/beetle2';
import Beetle3 from './beetle_connection/beetle3';
import Beetle4 from './beetle_connection/beetle4';
import Beetle5 from './beetle_connection/beetle5';
import Beetle6 from './beetle_connection/beetle6';
import Beetle7 from './beetle_connection/beetle7';
import EMG from './emg';
import DanceMove from './dance_move_display';
import Delay from './syncdelay';
import Position from './position';
import Receiver from './receiver';
import Receiver2 from './receiver2';
import mqtt from 'mqtt';

export const QosOption = createContext([])
const qosOption = [
  {
    label: '0',
    value: 0,
  }, {
    label: '1',
    value: 1,
  }, {
    label: '2',
    value: 2,
  },
];

const Mqtt = () => {
  const [client, setClient] = useState(null);
  const [isSubed, setIsSub] = useState(false);
  const [payload, setPayload] = useState({});
  const [connectStatus, setConnectStatus] = useState('Connect');

  const mqttConnect = ( ) => {
    setConnectStatus('Connecting');
    const url = `ws://broker.emqx.io:8083/mqtt`;
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
    setClient(mqtt.connect(url, options));
  };

  useEffect(() => {
    if (client) {
      client.on('connect', () => {
        setConnectStatus('Connected');
      });
      client.on('error', (err) => {
        console.error('Connection error: ', err);
        client.end();
      });
      client.on('reconnect', () => {
        setConnectStatus('Reconnecting');
      });
      client.on('message', (topic, message) => {
        const payload = { topic, message: message.toString() };
        setPayload(payload);
      });
    }
  }, [client]);

  const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        setConnectStatus('Connect');
      });
    }
  }

  const mqttPublish = (context) => {
    if (client) {
      const { topic, qos, payload } = context;
      client.publish(topic, payload, { qos }, error => {
        if (error) {
          console.log('Publish error: ', error);
        }
      });
    }
  }

  const mqttSub = ( ) => {
    if (client) {
      client.subscribe('dance move type | relative position | sync delay', { qos:0 }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        setIsSub(true)
      });
      client.subscribe('emg', { qos:0 }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        setIsSub(true)
      });
      client.subscribe('beetle1', { qos:0 }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        setIsSub(true)
      });
      client.subscribe('beetle2', { qos:0 }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        setIsSub(true)
      });
      client.subscribe('beetle3', { qos:0 }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        setIsSub(true)
      });
      client.subscribe('beetle4', { qos:0 }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        setIsSub(true)
      });
      client.subscribe('beetle5', { qos:0 }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        setIsSub(true)
      });
      client.subscribe('beetle6', { qos:0 }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        setIsSub(true)
      });
      client.subscribe('beetle7', { qos:0 }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        setIsSub(true)
      });

      client.subscribe('emg', { qos:0 }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        setIsSub(true)
      });

      client.subscribe('dancer1', { qos:0 }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        setIsSub(true)
      });
      client.subscribe('dancer2', { qos:0 }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        setIsSub(true)
      });
      client.subscribe('dancer3', { qos:0 }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        setIsSub(true)
      });

      client.subscribe('delay1', { qos:0 }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        setIsSub(true)
      });
      client.subscribe('delay2', { qos:0 }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        setIsSub(true)
      });
      client.subscribe('delay3', { qos:0 }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        setIsSub(true)
      });

      client.subscribe('position', { qos:0 }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        setIsSub(true)
      });
      client.subscribe('left', { qos:0 }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        setIsSub(true)
      });
      client.subscribe('center', { qos:0 }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        setIsSub(true)
      });
      client.subscribe('right', { qos:0 }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        setIsSub(true)
      });
    }
  };

  const mqttUnSub = (subscription) => {
    if (client) {
      const { topic } = subscription;
      client.unsubscribe(topic, error => {
        if (error) {
          console.log('Unsubscribe error', error)
          return
        }
        setIsSub(false);
      });
    }
  };

  return (
    <>
      <Connection connect={mqttConnect} disconnect={mqttDisconnect} connectBtn={connectStatus} />
      <QosOption.Provider value={qosOption}>
        <Subscriber sub={mqttSub} unSub={mqttUnSub} showUnsub={isSubed} />
        {/* <Publisher publish={mqttPublish} /> */}
      </QosOption.Provider>
      {/* beetle connection
      <div className="beetle connection">
        <Row gutter={16} justify="center">
        <Col span={25}>
            <Beetle7 payload={payload}/>
          </Col>
          <Col span={25}>
            <Beetle1 payload={payload}/>
          </Col>
          <Col span={25}>
            <Beetle2 payload={payload}/>
          </Col>
          <Col span={25}>
            <Beetle3 payload={payload}/>
          </Col>
          <Col span={25}>
            <Beetle4 payload={payload}/>
          </Col>
          <Col span={25}>
            <Beetle5 payload={payload}/>
          </Col>
          <Col span={25}>
            <Beetle6 payload={payload}/>
          </Col>

        </Row>
      </div> */}
      emg notification
      <EMG payload={payload}/>
      dance move types
      <DanceMove payload={payload}/>
      <Delay payload={payload}/>
      position
      <Position payload={payload}/>
      {/* <div className="site-card-wrapper">
        <Row gutter={16} justify="center">
          <Col span={25}>
            <Receiver payload={payload}/>
          </Col>
          <Col span={25}>
            <Receiver2 payload={payload}/>
          </Col>
        </Row>
      </div> */}
    </>
  );
}

export default Mqtt;