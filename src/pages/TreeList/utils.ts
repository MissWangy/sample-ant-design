export function mapDisabledKeys(data: any[], disabledKeys: any[], mtype: string) {
  const loopTree = (m: any[]): any[] => {
    return (
      m &&
      m.map(item => {
        let c: any = {};
        if (item.isDept && mtype === 'dept') {
          if (disabledKeys.indexOf(item.id) > -1) {
            item.disabled = true;
          }
        } else {
          if (item.attributes && disabledKeys.indexOf(item.attributes.userId) > -1)
            item.disabled = true;
        }
        return {
          ...item,
          children: loopTree(item.children),
        };
      })
    );
  };
  return loopTree(data);
}

export function disabledParentWithAllChildrenDisabled(data: any[], values: any[], mtype: string) {
  const loop = (list: any) => {
    return (
      list &&
      list.map((item: any) => {
        item.children = loop(item.children);
        if (
          item.children &&
          item.children.length > 0 &&
          !item.children.some((c: any) => !c.disabled)
        ) {
          item.disabled = true;
          item.disableCheckbox = true;
        }
        item.disableCheckbox = item.disabled;
        return item;
      })
    );
  };
  return loop(data);
}
