import request from '@/utils/request';

export async function queryMemberListService(params?: any) {
  const memberActionUrl = params.memberAction;
  const postData = params || {};
  delete postData.memberAction;
  return request(memberActionUrl, {
    method: 'POST',
    data: postData,
  });
}

export async function queryDeptListService(params?: any) {
  const actionUrl = params.deptAction;
  const postData = params || {};
  delete postData.deptAction;
  return request(actionUrl, {
    method: 'POST',
    data: postData,
  });
}
