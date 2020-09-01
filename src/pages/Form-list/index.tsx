import React, { useEffect, useState } from 'react';
import { Form, Input, Card, Row, Col, Button } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './index.less';
import moment from 'moment';

interface PropsTypes {
  dispatch: any;
  glabal: any;
  history: any;
}

const FormList: React.FC<PropsTypes> = (props: PropsTypes) => {
  const [form] = Form.useForm();
  const {} = props;

  useEffect(() => {
    form.setFieldsValue({
      timeVOList: [
        {
          resOnDutyPersonVOS: {
            day: {
              member: [{}],
              leader: [{}],
            },
            night: {
              member: [{}],
              leader: [{}],
            },
          },
        },
      ],
    });
  }, []);

  const onFinish = (values: any) => {
    console.info(values);
  };

  return (
    <PageHeaderWrapper>
      <div className={styles.content}>
        <Card>
          <Form name="dynamic_form_item" form={form} layout="horizontal" onFinish={onFinish}>
            <div className={styles.cardContent}>
              <div className={styles.cardBodyContent}>
                <div
                  className={`${styles.borderStyles} ${styles.dutyLineStyles}`}
                  style={{ width: 160 }}
                >
                  日期
                </div>
                <div className={styles.timeStyles}>
                  <div className={styles.cardBodyContent}>
                    <div
                      className={`${styles.borderStyles} ${styles.dutyLineStyles}`}
                      style={{ width: 160 }}
                    >
                      时段
                    </div>
                    <div className={styles.timeStyles}>
                      <div className={styles.cardBodyContent}>
                        <div
                          className={`${styles.borderStyles} ${styles.timeStyles2} ${styles.dutyLineStyles}`}
                        >
                          名字
                        </div>
                        <div
                          className={`${styles.borderStyles} ${styles.dutyLineStyles}`}
                          style={{ width: 200 }}
                        >
                          联系电话
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ width: '100%' }}>
                <Form.List name="timeVOList">
                  {fields => {
                    return (
                      <>
                        {fields.map((field: any, index) => {
                          return (
                            <div key={index} className={styles.cardBodyContent}>
                              <div className={styles.borderStyles} style={{ width: 160 }}>
                                {moment().format('YYYY-MM-DD ')}
                              </div>
                              <div className={styles.timeStyles}>
                                <div className={styles.cardBodyContent}>
                                  <Form.Item
                                    name={[field.name, 'resOnDutyPersonVOS']}
                                    // style={{ width: '100%' }}
                                    className={styles.formItemContent}
                                  >
                                    <div
                                      className={`${styles.lineStyles} ${styles.borderStyles}`}
                                      style={{ width: 160 }}
                                    >
                                      日间
                                    </div>
                                    <div className={styles.timeStyles}>
                                      <Form.Item label="日间" noStyle>
                                        <Form.List
                                          name={[field.name, 'resOnDutyPersonVOS', 'day', 'leader']}
                                        >
                                          {(secondFields, { add, remove }) => {
                                            return (
                                              <div style={{ width: '100%' }}>
                                                {secondFields.map(
                                                  (secondfield: any, index: number) => {
                                                    return (
                                                      <div
                                                        key={index}
                                                        className={styles.cardBodyContent}
                                                      >
                                                        <div style={{ width: '100%' }}>
                                                          <div
                                                            key={secondfield.key}
                                                            className={styles.cardBodyContent}
                                                          >
                                                            <div
                                                              className={`${styles.lineStyles} ${styles.borderStyles}`}
                                                              style={{ width: 160 }}
                                                            >
                                                              经理
                                                            </div>
                                                            <div className={styles.timeStyles}>
                                                              <div
                                                                key={secondfield.key}
                                                                className={styles.cardBodyContent}
                                                              >
                                                                <div
                                                                  className={`${styles.lineStyles} ${styles.borderStyles} ${styles.timeStyles2}`}
                                                                >
                                                                  <span
                                                                    style={{
                                                                      maxWidth: 450,
                                                                      width: 450,
                                                                    }}
                                                                  >
                                                                    <Form.Item
                                                                      {...secondfield}
                                                                      initialValue=""
                                                                      name={[
                                                                        secondfield.name,
                                                                        'name',
                                                                      ]}
                                                                      fieldKey={[
                                                                        secondfield.fieldKey,
                                                                        'name',
                                                                      ]}
                                                                    >
                                                                      <Input
                                                                        maxLength={50}
                                                                        placeholder="请输入"
                                                                      />
                                                                    </Form.Item>
                                                                  </span>
                                                                  <Form.Item
                                                                    className={
                                                                      styles.formItemStyles
                                                                    }
                                                                  >
                                                                    <PlusCircleOutlined
                                                                      className={
                                                                        styles.deleteButton
                                                                      }
                                                                      onClick={() => {
                                                                        add();
                                                                      }}
                                                                    />
                                                                  </Form.Item>
                                                                  <Form.Item noStyle shouldUpdate>
                                                                    {({ getFieldValue }) => {
                                                                      const isHas =
                                                                        getFieldValue('timeVOList')[
                                                                          field.name
                                                                        ].resOnDutyPersonVOS.day
                                                                          .leader.length &&
                                                                        getFieldValue('timeVOList')[
                                                                          field.name
                                                                        ].resOnDutyPersonVOS.day
                                                                          .leader.length > 1;

                                                                      return (
                                                                        <div>
                                                                          {isHas && (
                                                                            <Form.Item>
                                                                              <MinusCircleOutlined
                                                                                className={
                                                                                  styles.deleteButton
                                                                                }
                                                                                onClick={() => {
                                                                                  remove(
                                                                                    secondfield.name,
                                                                                  );
                                                                                }}
                                                                              />
                                                                            </Form.Item>
                                                                          )}
                                                                        </div>
                                                                      );
                                                                    }}
                                                                  </Form.Item>
                                                                </div>
                                                                <div
                                                                  className={`${styles.lineStyles} ${styles.borderStyles}`}
                                                                  style={{
                                                                    width: 200,
                                                                  }}
                                                                >
                                                                  <Form.Item
                                                                    {...secondfield}
                                                                    name={[
                                                                      secondfield.name,
                                                                      'phone',
                                                                    ]}
                                                                    initialValue=""
                                                                    fieldKey={[
                                                                      secondfield.fieldKey,
                                                                      'phone',
                                                                    ]}
                                                                    rules={[
                                                                      {
                                                                        required: true,
                                                                        message: '请输入',
                                                                      },
                                                                      {
                                                                        pattern: /^1[3456789]\d{9}$/,
                                                                        message:
                                                                          '请输入正确的手机号码',
                                                                      } as any,
                                                                    ]}
                                                                  >
                                                                    <Input placeholder="请输入" />
                                                                  </Form.Item>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    );
                                                  },
                                                )}
                                              </div>
                                            );
                                          }}
                                        </Form.List>
                                      </Form.Item>
                                      <Form.Item label="日间" noStyle>
                                        <Form.List
                                          name={[field.name, 'resOnDutyPersonVOS', 'day', 'member']}
                                        >
                                          {(secondFields, { add, remove }) => {
                                            return (
                                              <div style={{ width: '100%' }}>
                                                {secondFields.map((secondfield: any, index) => {
                                                  return (
                                                    <div
                                                      key={index}
                                                      className={styles.cardBodyContent}
                                                    >
                                                      <div style={{ width: '100%' }}>
                                                        <div
                                                          key={secondfield.key}
                                                          className={styles.cardBodyContent}
                                                        >
                                                          <div
                                                            className={`${styles.lineStyles} ${styles.borderStyles}`}
                                                            style={{ width: 160 }}
                                                          >
                                                            员工
                                                          </div>

                                                          <div
                                                            key={secondfield.key}
                                                            className={styles.timeStyles}
                                                          >
                                                            <div className={styles.cardBodyContent}>
                                                              <div
                                                                className={`${styles.lineStyles} ${styles.borderStyles} ${styles.timeStyles2}`}
                                                              >
                                                                <span
                                                                  style={{
                                                                    maxWidth: 450,
                                                                    width: 450,
                                                                  }}
                                                                >
                                                                  <Form.Item
                                                                    {...secondfield}
                                                                    initialValue=""
                                                                    name={[
                                                                      secondfield.name,
                                                                      'name',
                                                                    ]}
                                                                    fieldKey={[
                                                                      secondfield.fieldKey,
                                                                      'name',
                                                                    ]}
                                                                  >
                                                                    <Input
                                                                      maxLength={50}
                                                                      placeholder="请输入"
                                                                    />
                                                                  </Form.Item>
                                                                </span>
                                                                <Form.Item
                                                                  className={styles.formItemStyles}
                                                                >
                                                                  <PlusCircleOutlined
                                                                    className={styles.deleteButton}
                                                                    onClick={() => {
                                                                      add();
                                                                    }}
                                                                  />
                                                                </Form.Item>
                                                                <Form.Item noStyle shouldUpdate>
                                                                  {({ getFieldValue }) => {
                                                                    const isHas =
                                                                      getFieldValue('timeVOList')[
                                                                        field.name
                                                                      ].resOnDutyPersonVOS.day
                                                                        .member.length &&
                                                                      getFieldValue('timeVOList')[
                                                                        field.name
                                                                      ].resOnDutyPersonVOS.day
                                                                        .member.length > 1;

                                                                    return (
                                                                      <div>
                                                                        {isHas && (
                                                                          <Form.Item>
                                                                            <MinusCircleOutlined
                                                                              className={
                                                                                styles.deleteButton
                                                                              }
                                                                              onClick={() => {
                                                                                remove(
                                                                                  secondfield.name,
                                                                                );
                                                                              }}
                                                                            />
                                                                          </Form.Item>
                                                                        )}
                                                                      </div>
                                                                    );
                                                                  }}
                                                                </Form.Item>
                                                              </div>
                                                              <div
                                                                className={`${styles.lineStyles} ${styles.borderStyles}`}
                                                                style={{
                                                                  width: 200,
                                                                }}
                                                              >
                                                                <Form.Item
                                                                  {...secondfield}
                                                                  name={[secondfield.name, 'phone']}
                                                                  initialValue=""
                                                                  fieldKey={[
                                                                    secondfield.fieldKey,
                                                                    'phone',
                                                                  ]}
                                                                  rules={[
                                                                    {
                                                                      required: true,
                                                                      message: '请输入',
                                                                    },
                                                                    {
                                                                      pattern: /^1[3456789]\d{9}$/,
                                                                      message:
                                                                        '请输入正确的手机号码',
                                                                    } as any,
                                                                  ]}
                                                                >
                                                                  <Input placeholder="请输入" />
                                                                </Form.Item>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  );
                                                })}
                                              </div>
                                            );
                                          }}
                                        </Form.List>
                                      </Form.Item>
                                    </div>
                                  </Form.Item>
                                </div>

                                <div className={styles.cardBodyContent}>
                                  <Form.Item
                                    name={[field.name, 'resOnDutyPersonVOS']}
                                    // style={{ width: '100%' }}
                                    className={styles.formItemContent}
                                  >
                                    <div
                                      className={`${styles.lineStyles} ${styles.borderStyles}`}
                                      style={{ width: 160 }}
                                    >
                                      夜间
                                    </div>
                                    <div className={styles.timeStyles}>
                                      <Form.Item label="夜间" noStyle>
                                        <Form.List
                                          name={[
                                            field.name,
                                            'resOnDutyPersonVOS',
                                            'night',
                                            'leader',
                                          ]}
                                        >
                                          {(secondFields, { add, remove }) => {
                                            return (
                                              <div style={{ width: '100%' }}>
                                                {secondFields.map((secondfield: any, index) => {
                                                  return (
                                                    <div
                                                      key={index}
                                                      className={styles.cardBodyContent}
                                                    >
                                                      <div style={{ width: '100%' }}>
                                                        <div
                                                          key={secondfield.key}
                                                          className={styles.cardBodyContent}
                                                        >
                                                          <div
                                                            className={`${styles.lineStyles} ${styles.borderStyles}`}
                                                            style={{ width: 160 }}
                                                          >
                                                            经理
                                                          </div>
                                                          <div className={styles.timeStyles}>
                                                            <div
                                                              key={secondfield.key}
                                                              className={styles.cardBodyContent}
                                                            >
                                                              <div
                                                                className={`${styles.lineStyles} ${styles.borderStyles} ${styles.timeStyles2}`}
                                                              >
                                                                <span
                                                                  style={{
                                                                    maxWidth: 450,
                                                                    width: 450,
                                                                  }}
                                                                >
                                                                  <Form.Item
                                                                    {...secondfield}
                                                                    initialValue=""
                                                                    name={[
                                                                      secondfield.name,
                                                                      'name',
                                                                    ]}
                                                                    fieldKey={[
                                                                      secondfield.fieldKey,
                                                                      'name',
                                                                    ]}
                                                                  >
                                                                    <Input
                                                                      maxLength={50}
                                                                      placeholder="请输入"
                                                                    />
                                                                  </Form.Item>
                                                                </span>
                                                                <Form.Item
                                                                  className={styles.formItemStyles}
                                                                >
                                                                  <PlusCircleOutlined
                                                                    className={styles.deleteButton}
                                                                    onClick={() => {
                                                                      add();
                                                                    }}
                                                                  />
                                                                </Form.Item>
                                                                <Form.Item noStyle shouldUpdate>
                                                                  {({ getFieldValue }) => {
                                                                    const isHas =
                                                                      getFieldValue('timeVOList')[
                                                                        field.name
                                                                      ].resOnDutyPersonVOS.night
                                                                        .leader.length &&
                                                                      getFieldValue('timeVOList')[
                                                                        field.name
                                                                      ].resOnDutyPersonVOS.night
                                                                        .leader.length > 1;

                                                                    return (
                                                                      <div>
                                                                        {isHas && (
                                                                          <Form.Item>
                                                                            <MinusCircleOutlined
                                                                              className={
                                                                                styles.deleteButton
                                                                              }
                                                                              onClick={() => {
                                                                                remove(
                                                                                  secondfield.name,
                                                                                );
                                                                              }}
                                                                            />
                                                                          </Form.Item>
                                                                        )}
                                                                      </div>
                                                                    );
                                                                  }}
                                                                </Form.Item>
                                                              </div>
                                                              <div
                                                                className={`${styles.lineStyles} ${styles.borderStyles}`}
                                                                style={{
                                                                  width: 200,
                                                                }}
                                                              >
                                                                <Form.Item
                                                                  {...secondfield}
                                                                  name={[secondfield.name, 'phone']}
                                                                  initialValue=""
                                                                  fieldKey={[
                                                                    secondfield.fieldKey,
                                                                    'phone',
                                                                  ]}
                                                                  rules={[
                                                                    {
                                                                      required: true,
                                                                      message: '请输入',
                                                                    },
                                                                    {
                                                                      pattern: /^1[3456789]\d{9}$/,
                                                                      message:
                                                                        '请输入正确的手机号码',
                                                                    } as any,
                                                                  ]}
                                                                >
                                                                  <Input placeholder="请输入" />
                                                                </Form.Item>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  );
                                                })}
                                              </div>
                                            );
                                          }}
                                        </Form.List>
                                      </Form.Item>
                                      <Form.Item label="夜间" noStyle>
                                        <Form.List
                                          name={[
                                            field.name,
                                            'resOnDutyPersonVOS',
                                            'night',
                                            'member',
                                          ]}
                                        >
                                          {(secondFields, { add, remove }) => {
                                            return (
                                              <div style={{ width: '100%' }}>
                                                {secondFields.map((secondfield: any, index) => {
                                                  return (
                                                    <div
                                                      key={index}
                                                      className={styles.cardBodyContent}
                                                    >
                                                      <div style={{ width: '100%' }}>
                                                        <div
                                                          key={secondfield.key}
                                                          className={styles.cardBodyContent}
                                                        >
                                                          <div
                                                            className={`${styles.lineStyles} ${styles.borderStyles}`}
                                                            style={{ width: 160 }}
                                                          >
                                                            员工
                                                          </div>

                                                          <div
                                                            key={secondfield.key}
                                                            className={styles.timeStyles}
                                                          >
                                                            <div className={styles.cardBodyContent}>
                                                              <div
                                                                className={`${styles.lineStyles} ${styles.borderStyles} ${styles.timeStyles2}`}
                                                              >
                                                                <span
                                                                  style={{
                                                                    maxWidth: 450,
                                                                    width: 450,
                                                                  }}
                                                                >
                                                                  <Form.Item
                                                                    {...secondfield}
                                                                    initialValue=""
                                                                    name={[
                                                                      secondfield.name,
                                                                      'name',
                                                                    ]}
                                                                    fieldKey={[
                                                                      secondfield.fieldKey,
                                                                      'name',
                                                                    ]}
                                                                  >
                                                                    <Input
                                                                      maxLength={50}
                                                                      placeholder="请输入"
                                                                    />
                                                                  </Form.Item>
                                                                </span>
                                                                <Form.Item
                                                                  className={styles.formItemStyles}
                                                                >
                                                                  <PlusCircleOutlined
                                                                    className={styles.deleteButton}
                                                                    onClick={() => {
                                                                      add();
                                                                    }}
                                                                  />
                                                                </Form.Item>
                                                                <Form.Item noStyle shouldUpdate>
                                                                  {({ getFieldValue }) => {
                                                                    const isHas =
                                                                      getFieldValue('timeVOList')[
                                                                        field.name
                                                                      ].resOnDutyPersonVOS.night
                                                                        .member.length &&
                                                                      getFieldValue('timeVOList')[
                                                                        field.name
                                                                      ].resOnDutyPersonVOS.night
                                                                        .member.length > 1;

                                                                    return (
                                                                      <div>
                                                                        {isHas && (
                                                                          <Form.Item>
                                                                            <MinusCircleOutlined
                                                                              className={
                                                                                styles.deleteButton
                                                                              }
                                                                              onClick={() => {
                                                                                remove(
                                                                                  secondfield.name,
                                                                                );
                                                                              }}
                                                                            />
                                                                          </Form.Item>
                                                                        )}
                                                                      </div>
                                                                    );
                                                                  }}
                                                                </Form.Item>
                                                              </div>
                                                              <div
                                                                className={`${styles.lineStyles} ${styles.borderStyles}`}
                                                                style={{
                                                                  width: 200,
                                                                }}
                                                              >
                                                                <Form.Item
                                                                  {...secondfield}
                                                                  name={[secondfield.name, 'phone']}
                                                                  initialValue=""
                                                                  fieldKey={[
                                                                    secondfield.fieldKey,
                                                                    'phone',
                                                                  ]}
                                                                  rules={[
                                                                    {
                                                                      required: true,
                                                                      message: '请输入',
                                                                    },
                                                                    {
                                                                      pattern: /^1[3456789]\d{9}$/,
                                                                      message:
                                                                        '请输入正确的手机号码',
                                                                    } as any,
                                                                  ]}
                                                                >
                                                                  <Input placeholder="请输入" />
                                                                </Form.Item>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  );
                                                })}
                                              </div>
                                            );
                                          }}
                                        </Form.List>
                                      </Form.Item>
                                    </div>
                                  </Form.Item>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    );
                  }}
                </Form.List>
              </div>
            </div>
            <div style={{ height: 24 }} />
            <Form.Item>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </PageHeaderWrapper>
  );
};

export default FormList;
