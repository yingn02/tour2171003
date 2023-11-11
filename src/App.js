import React, { useState } from 'react';
import AddSearchBox from './components/AddSearchBox';
import AddTypeFilter from './components/AddTypeFilter';
import AddMap from "./components/AddMap";
import AddWeatherUI from './components/AddWeatherUI';
import AddNews from './components/AddNews';
import AddBottomSideBar from './components/AddBottomSideBar';

//전체적인 흐름 (자세한 건 각 컴포넌트에 작성)
// AddSearchBox <-> App (검색어&장소분류선택과 검색결과의 상호작용)
// AddTypeFilter -> App -> AddSearchBox (App은 장소분류선택의 값을 AddSearchBox로 보내는 통로 역할)
// App (검색결과를 각 컴포넌트들에게 전달)
// App -> AddWeatherUI -> AddWeatherInfo (검색어를 카카오API에 보내서 좌표로 바꾸고, 날씨 출력)
// App -> AddNews (검색어를 네이버 뉴스 API에 보내고, 뉴스 출력)
// App -> AddBottomSideBar -> AddBottomCards -> AddBottomCard (App에서 받은 검색결과를 카드의 모음으로 표시)
// AddMap (독립적, 카카오API)
// 나머지 컴포넌트들은 모두 라이브러리
// 검색결과는 관광지 정보 목록을 의미함
function App() {
    const [searchQuery, setSearchQuery] = useState(''); //검색어
    const [selectedType, setSelectedType] = useState(''); //장소 분류 선택
    const [data, setData] = useState(null); //검색결과

    const onDataFetched = (data) => { //검색어와 장소분류 선택을 조합하여 검색결과 업데이트
        setData(data);
    };

    return (
        <>
            <div>
                <AddSearchBox 
                selectedType={selectedType}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onDataFetched={onDataFetched}
                />
            </div>
            <br />
            <div>
                <AddTypeFilter onSelect={(value) => setSelectedType(value)} />
            </div>
            <br />
            <div style={{ display: 'flex' }}>
                <div>
                    <AddMap/>
                </div>
                &emsp;
                <div>
                    <div>
                        <AddWeatherUI cdata={data} search={searchQuery}/>
                    </div>
                    <br/>
                    <div>
                        <AddNews cdata={data} search={searchQuery}/>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <AddBottomSideBar cdata={data} search={searchQuery}/>
        </>
    );
}

export default App;