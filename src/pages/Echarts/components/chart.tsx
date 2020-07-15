import React, { useEffect, useState } from 'react';
import Echarts from 'echarts';
import { Card } from 'antd';

const Chart = (props: any) => {
  const { option, extra, title, idName } = props;
  const [myChart, setMyChart] = useState(null);

  useEffect(() => {
    if (myChart) {
      myChart.clear();
    }
    let curChart = Echarts.init(document.getElementById(idName));
    setMyChart(curChart);
    // 指定图表的配置项和数据

    // 使用刚指定的配置项和数据显示图表。
    curChart.setOption(option);
  }, [option]);

  return (
    <Card title={title} extra={extra}>
      <div id={idName} style={{ width: '100%', height: 400 }}></div>
    </Card>
  );
};

export default Chart;
