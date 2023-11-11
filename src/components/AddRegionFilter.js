import React, { useState } from 'react';
import { Select } from 'antd';

const AddRegionFilter = function ({ onSelect }) {
  const onChange = (value) => {
    onSelect(value); // 선택된 값을 부모 컴포넌트로 전달
  };
  
  const onSearch = (value) => {
    console.log('search:', value);
  };

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <Select
        showSearch
        placeholder="지역 선택"
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
            value: '1',
            label: '서울',
          },
          {
            value: '2',
            label: '인천',
          },
          {
            value: '3',
            label: '대전',
          },
          {
            value: '4',
            label: '대구',
          },
          {
            value: '5',
            label: '광주',
          },
          {
            value: '6',
            label: '부산',
          },
          {
            value: '7',
            label: '울산',
          },
          {
            value: '8',
            label: '세종특별자치시',
          },
          {
            value: '9',
            label: '경기도',
          },
          {
            value: '10',
            label: '강원도',
          },
        ]}
      />

    </>
  );
}

export default AddRegionFilter;
