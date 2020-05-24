import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Chart } from '@antv/g2';

const Round: React.FC<any> = (props: any) => {
  const data = [
    { item: '事例一', count: 40, percent: 0.4 },
    { item: '事例二', count: 21, percent: 0.21 },
    { item: '事例三', count: 17, percent: 0.17 },
    { item: '事例四', count: 13, percent: 0.13 },
    { item: '事例五', count: 9, percent: 0.09 },
  ];
  useEffect(() => {
    const chart = new Chart({
      container: 'round',
      autoFit: true,
      height: 400,
    });
    chart.data(data);
    chart.scale('percent', {
      formatter: val => {
        val = val * 100 + '%';
        return val;
      },
    });
    chart.coordinate('theta', {
      radius: 0.75,
      innerRadius: 0.6,
    });
    chart.tooltip({
      showTitle: false,
      showMarkers: false,
      itemTpl:
        '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
    });
    // 辅助文本
    chart
      .annotation()
      .text({
        position: ['50%', '50%'],
        content: '主机',
        style: {
          fontSize: 14,
          fill: '#8c8c8c',
          textAlign: 'center',
        },
        offsetY: -20,
      })
      .text({
        position: ['50%', '50%'],
        content: '200',
        style: {
          fontSize: 20,
          fill: '#8c8c8c',
          textAlign: 'center',
        },
        offsetX: -10,
        offsetY: 20,
      })
      .text({
        position: ['50%', '50%'],
        content: '台',
        style: {
          fontSize: 14,
          fill: '#8c8c8c',
          textAlign: 'center',
        },
        offsetY: 20,
        offsetX: 20,
      });
    chart
      .interval()
      .adjust('stack')
      .position('percent')
      .color('item')
      .label('percent', percent => {
        return {
          content: data => {
            return `${data.item}: ${percent * 100}%`;
          },
        };
      })
      .state({
        active: {
          style: element => {
            const shape = element.shape;
            return {
              lineWidth: 5,
              stroke: shape.attr('fill'),
              strokeOpacity: shape.attr('fillOpacity'),
            };
          }, // 配置 active 样式，通过加粗边框实现放大效果
        },
      })
      .tooltip('item*percent', (item, percent) => {
        percent = percent * 100 + '%';
        return {
          name: item,
          value: percent,
        };
      });
    chart.legend({
      position: 'right-bottom',
    }); // 只更改 x 维度对应的图例的显示位置

    chart.interaction('element-active');

    chart.render();
  }, []);

  return <div id="round"></div>;
};

export default Round;
