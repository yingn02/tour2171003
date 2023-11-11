import React, { useState } from 'react';
import { Button, Drawer, Space } from 'antd';
import AddBottomCards from './AddBottomCards';

//이 컴포넌트는 하단사이드바를 열 수 있는 버튼을 제공합니다.
//버튼을 누르면 하단사이드바를 띄우고, 내용을 AddBottomCards로 지정합니다.
//AddBottomCards에는 App에서의 검색결과를 넘겨줍니다
const AddBottomSideBar = ({ cdata }) => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('bottom');
  const showDrawer = () => {
    setOpen(true);
  };
  
  const onClose = () => {
    setOpen(false);
  };

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
      <AddBottomCards bdata={cdata}/>
      </Drawer>
    </>
  );
};
export default AddBottomSideBar;