import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Chart } from '@antv/g2';
import { Card, Row, Col } from 'antd';
import Round from './components/round';
import Line from './components/line';

const Echart: React.FC<any> = (props: any) => {
  return (
    <Row gutter={12}>
      <Col span={12}>
        <Card title="环图">
          <Round />
        </Card>
      </Col>
      <Col span={12}>
        <Card title="折线图">
          <Line />
        </Card>
      </Col>
    </Row>
  );
};

export default Echart;
