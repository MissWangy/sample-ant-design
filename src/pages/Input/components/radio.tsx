import React from 'react';
import { Radio } from 'antd';
import { RadioGroupProps } from 'antd/lib/radio/interface';

export interface RadioProps {
  idKey?: string;
  nameKey?: string;
  options: Array<ItemProps>;
  value?: number | string;
  size?: string;
  onChange?: (data: any) => void;
}

export interface ItemProps {
  [key: string]: any; // 定义对象的下标为string类型
}

const RadioFields: React.FC<RadioProps> = props => {
  const { idKey = 'label', nameKey = 'value', onChange, options, ..._props } = props;

  const handleChange = (e: any) => {
    typeof onChange === 'function' && onChange(e.target.value);
  };

  return (
    <>
      <Radio.Group {...(_props as RadioGroupProps)} onChange={(e: any) => handleChange(e)}>
        {options.map((item: any) => {
          return (
            <Radio value={item[idKey]} key={item[idKey]} disabled={item.disabled}>
              {item[nameKey]}
            </Radio>
          );
        })}
      </Radio.Group>
    </>
  );
};

export default RadioFields;
