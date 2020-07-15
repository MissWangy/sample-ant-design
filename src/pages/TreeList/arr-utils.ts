/**
 * 将树形对象转变成平级数组
 * @param {*} obj  树形对象
 * @param {*} childrenField  下级元素的属性名
 * @param {*} excludeField  排除元素的属性名
 */

export function loopTreeToArr(obj: any, childrenField?: string, excludeField?: any) {
  if (childrenField === undefined) {
    childrenField = 'children';
  }
  if (obj === undefined) {
    return [];
  }
  const arr = [];
  if (excludeField === undefined || obj[excludeField]) {
    arr.push(obj);
  }
  if (obj[childrenField] && obj[childrenField].length > 0) {
    loopTree(obj[childrenField], arr, childrenField, excludeField);
  }
  return arr;
}

export function loopTree(
  loopArr: any[],
  arr: any[],
  childrenField: string = 'children',
  excludeField: string,
) {
  loopArr &&
    loopArr.map(li => {
      if (excludeField === undefined || li[excludeField]) {
        arr.push(li);
      }
      if (li[childrenField] && li[childrenField].length > 0) {
        loopTree(li[childrenField], arr, childrenField, excludeField);
      }
    });
}

/**
 * 平级数组转化成树形数组
 * @param arrData 待转化的数组
 * @param idFidle 主键属性
 * @param parentField 父id属性
 * @param rootValue 根节点的父id属性值
 * @param childrenField 子属性
 */
export function translateArrToTree(
  arrData: any[],
  rootValue: any = undefined,
  idFidle: string = 'id',
  parentField: string = 'parentId',
  childrenField: string = 'children',
) {
  if (arrData === undefined) {
    return arrData;
  }
  let tree: any[] = [];
  let temp;
  arrData.forEach(item => {
    if (item[parentField] == rootValue) {
      let obj = item;
      temp = translateArrToTree(arrData, item[idFidle]);
      if (temp && temp.length > 0) {
        obj[childrenField] = temp;
      }
      tree.push(obj);
    }
  });
  return tree;
}

/**
 * 递归转化数组的属性
 * @param arrData
 * @param translateFields
 * @param childrenProps
 */
export function translateArrField(
  arrData: any[],
  translateFields: { sourceField: string; targetField: string }[],
  childrenProps: string = 'children',
) {
  if (arrData === undefined) {
    return arrData;
  }
  arrData.forEach(item => {
    if (item[childrenProps]) {
      item[childrenProps] = translateArrField(item[childrenProps], translateFields, childrenProps);
    }
    translateFields &&
      translateFields.map(fitem => {
        item[fitem.targetField] = item[fitem.sourceField];
      });
  });
  return arrData;
}

/**
 * 快速排序
 * @param arr
 */
export function quickSort(arr: any[], sortFied: string = 'sort'): any[] {
  //如果数组长度小于等于1，则返回数组本身
  if (arr.length <= 1) {
    return arr;
  }
  //定义中间值的索引
  const index = Math.floor(arr.length / 2);
  //取到中间值
  const temp = arr.splice(index, 1);
  //定义左右部分数组
  const left = [];
  const right = [];
  for (let i = 0; i < arr.length; i++) {
    //如果元素比中间值小，那么放在左边，否则放右边
    if (arr[i][sortFied] < temp[sortFied]) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left, sortFied).concat(temp, quickSort(right, sortFied));
}
