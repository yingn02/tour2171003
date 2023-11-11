import React, { useState } from 'react';
import { Select } from 'antd';

const AddTypeFilter = function ({ onSelect }) {
  const onChange = (value) => {
    //console.log(`selected ${value}`);
    onSelect(value); // 선택된 값을 부모 컴포넌트로 전달
  };
  
  const onSearch = (value) => {
    
  };

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <Select
        showSearch
        placeholder="장소 분류 선택"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={filterOption}
        style={{ width: '200px' }}
        options={[
          {
            value: '',
            label: '전체',
          },
          {
            value: '12',
            label: '관광특화',
          },
          {
            value: '14',
            label: '문화시설',
          },
          {
            value: '15',
            label: '행사/공연/축제',
          },
          {
            value: '25',
            label: '여행코스',
          },
          {
            value: '28',
            label: '레포츠',
          },
          {
            value: '32',
            label: '숙박',
          },
          {
            value: '38',
            label: '쇼핑',
          },
          {
            value: '39',
            label: '음식',
          },
        ]}
      />

    </>
  );
}

export default AddTypeFilter;
