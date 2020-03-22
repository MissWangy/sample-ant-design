import React, { useState } from 'react';
import { Card, Row, Col, Empty, Form } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import styles from './index.less';
import { ContentUtils } from 'braft-utils';

const editorStateInt = BraftEditor.createEditorState(null);
const BraftEditorPage: React.FC<> = () => {
  const [editorState, setEditorState] = useState(editorStateInt);

  // const { editorState } = this.state;
  const excludeControls = [
    'letter-spacing',
    'line-height',
    'clear',
    'headings',
    'list-ol',
    'list-ul',
    'remove-styles',
    'superscript',
    'subscript',
    'hr',
    'text-align',
    'blockquote',
    'code',
    'text-indent',
    'strike-through',
  ];

  const handleEditorChange = (editorState: any) => {
    setEditorState(editorState);
  };
  return (
    <Card>
      <Row gutter={24}>
        <Col span={12}>
          <div style={{ border: '1px solid #00000033' }}>
            <BraftEditor
              value={editorState}
              onChange={handleEditorChange}
              excludeControls={excludeControls}
            />
          </div>
        </Col>
        <Col span={12}>
          <Card title="实时预览" type="inner" style={{ border: '1px solid #00000033' }}>
            {editorState.toHTML() === '<p></p>' ? (
              <Empty />
            ) : (
              <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: editorState.toHTML() }}
              />
            )}
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default BraftEditorPage;
