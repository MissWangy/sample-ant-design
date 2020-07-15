import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import Chart from './components/chart';

import { getChartPieData, getChartBarData } from './service';

const Echarts: React.FC<any> = (props: any) => {
  const [optionPie, setOptionPie] = useState<any>({
    color: [
      '#57ACFF',
      '#00DD30',
      '#FFBB00',
      '#00D7C1',
      '#FF5064',
      '#9A95FF',
      '#6052E7',
      '#00DEFF',
      '#FA58FF',
      '#546570',
      '#c4ccd3',
    ],
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      x: 'left',
      y: 'top',
      data: [],
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        labelLine: {
          show: false,
        },
        data: [],
      },
    ],
    title: {
      text: '信众人数',
      left: 'center',
      top: '50%',
      textStyle: {
        color: '#333',
        fontSize: 14,
        align: 'center',
      },
    },
    graphic: {
      type: 'text',
      left: 'center',
      top: '40%',
      style: {
        text: 0,
        textAlign: 'center',
        fill: '#333',
        fontSize: 14,
        fontWeight: 600,
      },
    },
  });

  const [optionBar, setOptionBar] = useState<any>({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      show: false,
    },
    yAxis: {
      type: 'category',
      data: [],
      axisTick: {
        show: false,
        alignWithLabel: false,
      },
      axisLine: {
        show: false,
      },
    },
    series: [
      {
        name: '2011年',
        type: 'bar',
        data: [],
        itemStyle: {
          normal: {
            // color: '#07c160',
          },
        },
        label: {
          normal: {
            show: true,
            position: 'right',
            textStyle: {
              fontSize: 12,
              color: '#333',
            },
          },
        },
      },
    ],
  });

  useEffect(() => {
    getEchartData();
  }, []);

  async function queryCommon(fn: any, params: any, cb: any) {
    try {
      const res = await fn(params);
      if (res && res.data) cb(res.data);
      return res && res.data;
    } catch (error) {
      console.error(error);
    }
  }

  const getEchartData = () => {
    // 饼图
    queryCommon(getChartPieData, {}, (data: any) => {
      const ENUM = {
        data1: {
          desc: '年龄18-30',
        },
        data2: {
          desc: '年龄30-40',
        },
        data3: {
          desc: '年龄40-50',
        },
        data4: {
          desc: '年龄50-60',
        },
        data5: {
          desc: '年龄60-70',
        },
        data6: {
          desc: '年龄70以上',
        },
      };
      const totalNum = Object.keys(data).reduce((result, next) => result + data[next], 0);
      const ENUM_VALUE: any[] = [];
      optionPie.legend.data = Object.keys(data).map((item: any, i) => {
        ENUM_VALUE.push(ENUM[item].desc);
        return {
          name: ENUM[item] ? ENUM[item].desc : '--',
        };
      });
      optionPie.legend.formatter = (name: string) => {
        const curIndex = ENUM_VALUE.indexOf(name);
        const values = Object.values(data);
        const curNum: number = values[curIndex] as number;
        const percent = Number((curNum * 100) / totalNum).toFixed(2);

        return `${name}  ${percent}%  ${curNum}人`;
      };
      optionPie.series[0].data = Object.keys(data).map((item: any, i) => ({
        name: ENUM[item] ? ENUM[item].desc : '--',
        value: data[item],
        label: {
          normal: {
            formatter: '{b}: {c}',
            textStyle: {
              fontSize: '14',
              fontWeight: 'normal',
            },
          },
        },
      }));
      optionPie.graphic.style.text = totalNum;
      setOptionPie({
        ...optionPie,
      });
    });

    // 柱状图
    queryCommon(getChartBarData, {}, (data: any) => {
      optionBar.yAxis.data = data.map((item: any) => item.name);
      optionBar.series[0].data = data.map((item: any) => {
        return {
          value: item.count,
          label: {
            show: true,
            formatter: () => {
              return item.count + ' ' + item.point + '%';
            },
          },
        };
      });
      setOptionBar({
        ...optionBar,
      });
    });
  };

  return (
    <Row gutter={[24, 24]} justify="space-between">
      <Col span={12}>
        <Chart option={optionPie} idName="pie" title="饼图" extra={<span>单位：人</span>} />
      </Col>
      <Col span={12}>
        <Chart option={optionBar} idName="bar" title="柱形图" extra={<span>单位：人</span>} />
      </Col>
    </Row>
  );
};

export default Echarts;
