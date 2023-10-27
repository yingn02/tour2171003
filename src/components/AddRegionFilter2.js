import React, { useState } from 'react';
import { Radio, TreeSelect } from 'antd';
const treeData = [
  {
    value: '',
    title: '전체',
    children: [
      {
        value: '1',
        title: '서울',
        children: [
          {
            value: '1-1',
            title: '강남구',
          },
          {
            value: '1-2',
            title: '강동구',
          },
          {
            value: '1-3',
            title: '강북구',
          },
          {
            value: '1-4',
            title: '강서구',
          },
          {
            value: '1-5',
            title: '관악구',
          },
          {
            value: '1-6',
            title: '광진구',
          },
          {
            value: '1-7',
            title: '구로구',
          },
          {
            value: '1-8',
            title: '금천구',
          },
          {
            value: '1-9',
            title: '노원구',
          },
          {
            value: '1-10',
            title: '도봉구',
          },
          {
            value: '1-11',
            title: '동대문구',
          },
          {
            value: '1-12',
            title: '동작구',
          },
          {
            value: '1-13',
            title: '마포구',
          },
          {
            value: '1-14',
            title: '서대문구',
          },
          {
            value: '1-15',
            title: '서초구',
          },
          {
            value: '1-16',
            title: '성동구',
          },
          {
            value: '1-17',
            title: '성북구',
          },
          {
            value: '1-18',
            title: '송파구',
          },
          {
            value: '1-19',
            title: '양천구',
          },
          {
            value: '1-20',
            title: '영등포구',
          },
          {
            value: '1-21',
            title: '용산구',
          },
          {
            value: '1-22',
            title: '은평구',
          },
          {
            value: '1-23',
            title: '종로구',
          },
          {
            value: '1-24',
            title: '중구',
          },
          {
            value: '1-25',
            title: '중랑구',
          },
        ],
      },

      {
        value: '2',
        title: '인천',
        children: [
          {
            value: '2-1',
            title: '강화군'
          },
          {
            value: '2-2',
            title: '계양구'
          },
          {
            value: '2-3',
            title: '미추홀구'
          },
          {
            value: '2-4',
            title: '남동구'
          },
          {
            value: '2-5',
            title: '동구'
          },
          {
            value: '2-6',
            title: '부평구'
          },
          {
            value: '2-7',
            title: '서구'
          },
          {
            value: '2-8',
            title: '연수구'
          },
          {
            value: '2-9',
            title: '옹진군'
          },
          {
            value: '2-10',
            title: '중구'
          },
        ],
      },

      {
        value: '3',
        title: '대전',
        children: [
          {
            value: '3-1',
            title: '대덕구'
          },
          {
            value: '3-2',
            title: '동구'
          },
          {
            value: '3-3',
            title: '서구'
          },
          {
            value: '3-4',
            title: '유성구'
          },
          {
            value: '3-5',
            title: '중구'
          },
        ],
      },

      {
        value: '4',
        title: '대구',
        children: [
          {
            value: '4-1',
            title: '남구'
          },
          {
            value: '4-2',
            title: '달서구'
          },
          {
            value: '4-3',
            title: '달성군'
          },
          {
            value: '4-4',
            title: '동구'
          },
          {
            value: '4-5',
            title: '북구'
          },
          {
            value: '4-6',
            title: '서구'
          },
          {
            value: '4-7',
            title: '수성구'
          },
          {
            value: '4-8',
            title: '중구'
          },
          {
            value: '4-9',
            title: '군위군'
          },
        ],
      },

      {
        value: '5',
        title: '광주',
        children: [
          {
            value: '5-1',
            title: '광산구'
          },
          {
            value: '5-2',
            title: '남구'
          },
          {
            value: '5-3',
            title: '동구'
          },
          {
            value: '5-4',
            title: '북구'
          },
          {
            value: '5-5',
            title: '서구'
          },
        ],
      },

      {
        value: '6',
        title: '부산',
        children: [
          {
            value: '6-1',
            title: '강서구'
          },
          {
            value: '6-2',
            title: '금정구'
          },
          {
            value: '6-3',
            title: '기장군'
          },
          {
            value: '6-4',
            title: '남구'
          },
          {
            value: '6-5',
            title: '동구'
          },
          {
            value: '6-6',
            title: '동래구'
          },
          {
            value: '6-7',
            title: '부산진구'
          },
          {
            value: '6-8',
            title: '북구'
          },
          {
            value: '6-9',
            title: '사상구'
          },
          {
            value: '6-10',
            title: '사하구'
          },
          {
            value: '6-11',
            title: '서구'
          },
          {
            value: '6-12',
            title: '수영구'
          },
          {
            value: '6-13',
            title: '연제구'
          },
          {
            value: '6-14',
            title: '영도구'
          },
          {
            value: '6-15',
            title: '중구'
          },
          {
            value: '6-16',
            title: '해운대구'
          },
        ],
      },

      {
        value: '7',
        title: '울산',
        children: [
          {
            value: '7-1',
            title: '중구'
          },
          {
            value: '7-2',
            title: '남구'
          },
          {
            value: '7-3',
            title: '동구'
          },
          {
            value: '7-4',
            title: '북구'
          },
          {
            value: '7-5',
            title: '울주군'
          },

        ],
      },

      {
        value: '8',
        title: '세종특별자치시',
      },

      {
        value: '9',
        title: '경기도',
      },

      {
        value: '10',
        title: '강원도',
      },
    ],
  },
];

const AddRegionFilter2 = ({ onSelect }) => {
  const [placement, SetPlacement] = useState('bottomLeft');
  const onChange = (value) => {
    console.log(`selected ${value}`);
    onSelect(value); // 선택된 값을 부모 컴포넌트로 전달
  };
  
  const onSearch = (value) => {
    console.log('search:', value);
  };

//   const filterOption = (input, option) =>
//     (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  
  return (
    <>
      <TreeSelect
        showSearch
        dropdownStyle={{
          maxHeight: 400,
          overflow: 'auto',
          minWidth: 300,
        }}
        placeholder="지역 선택"
        popupMatchSelectWidth={false}
        placement={placement}
        allowClear
        treeDefaultExpandAll
        treeData={treeData}
        onChange={onChange}
        onSearch={onSearch}
        
      />
    </>
  );
};
export default AddRegionFilter2;