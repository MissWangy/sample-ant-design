import request from '@/utils/request';

export async function getChartPieData(params: any) {
  return request('/echartsPie/data', {
    method: 'POST',
    params,
  });
}

export async function getChartBarData(params: any) {
  return request('/echartsBar/data', {
    method: 'POST',
    params,
  });
}
