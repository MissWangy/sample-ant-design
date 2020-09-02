import React, { useState, useEffect, useMemo } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';
import styles from './index.less';

const Formily: React.FC<any> = () => {
  return (
    <PageHeaderWrapper>
      <Card title="formily">
        <div className={styles.imageContent}>121212</div>
      </Card>
    </PageHeaderWrapper>
  );
};

// export default connect({},{})(TreeList)

export default Formily;
