import React, { useState } from 'react';
import { Button, Drawer, Radio, Space } from 'antd';
import AddCards from './AddCards';
const AddBottomBar = ({ cdata }) => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('bottom');
  const showDrawer = () => {
    setOpen(true);
  };
  
  const onClose = () => {
    setOpen(false);
  };

  // const onChange = (e) => {
  //   setPlacement(e.target.value);
  // };

  return (
    <>
      <Space>
        <Button type="primary" onClick={showDrawer}>
          관광지 정보 목록 보기
        </Button>
      </Space>

      <Drawer
        title="관광지 정보"
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
      >
      <AddCards bdata={cdata}/>
      </Drawer>
    </>
  );
};
export default AddBottomBar;