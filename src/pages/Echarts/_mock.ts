import { Request, Response } from 'express';

function queryPieData(req: Request, res: Response, u: string) {
  const result = {
    code: '000000',
    data: {
      data1: 10,
      data2: 14,
      data3: 8,
      data4: 5,
      data5: 2,
      data6: 0,
    },
  };

  return res.json(result);
}

function queryBarData(req: Request, res: Response, u: string) {
  const result = {
    code: '000000',
    data: [
      { name: '浙江省', count: 31, point: '57.41' },
      { name: '宁夏回族自治区', count: 13, point: '24.07' },
      { name: '河南省', count: 3, point: '5.56' },
      { name: '青海省', count: 3, point: '5.56' },
      { name: '广东省', count: 1, point: '1.85' },
      { name: '云南省', count: 1, point: '1.85' },
      { name: '甘肃省', count: 1, point: '1.85' },
      { name: '江苏省', count: 1, point: '1.85' },
    ],
  };
  return res.json(result);
}

export default {
  'POST  /proxy/echartsPie/data': queryPieData,
  'POST  /proxy/echartsBar/data': queryBarData,
};
