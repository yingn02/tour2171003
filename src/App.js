import React, { useState, useEffect } from 'react';
import AddSearchBox from './components/AddSearchBox';
import AddTypeFilter from './components/AddTypeFilter';
import AddRegionFilter from './components/AddRegionFilter';
import AddMap from "./components/AddMap";
import AddWeather from './components/AddWeather';
import { Map } from 'react-kakao-maps-sdk';
import AddNews from './components/AddNews';
import AddBottomBar from './components/AddBottomBar';


const App = function () {
    const [searchQuery, setSearchQuery] = useState(''); //검색
    const [selectedType, setSelectedType] = useState(''); // 장소 분류 선택
    const [selectedRegion, setSelectedRegion] = useState(''); //지역 선택
    const [data, setData] = useState(null); //data 저장

    // 검색어를 업데이트
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    // 선택된 장소 분류를 업데이트
    const handleTypeChange = (value) => {
        setSelectedType(value);
    };

    // 선택된 지역을 업데이트
    const handleRegionChange = (value) => {
        setSelectedRegion(value);
    };

    useEffect(() => {
        let url;
        if(searchQuery && selectedType && selectedRegion) { //전부 입력
            url =
            `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?numOfRows=100&MobileOS=WIN&MobileApp=App&_type=json&keyword=${searchQuery}&contentTypeId=${selectedType}&areaCode=${selectedRegion}&serviceKey=jSLG7PhndCZp9dBtSCY5UGFS4dLgXrtHWCe4JURn1K7VE7UDXwRv9xyHgez0UaGVP8L9%2Bv22bAKf9Uy%2BPWrFeQ%3D%3D`;
        }
        else if(searchQuery && !selectedType && !selectedRegion) { //검색어만 입력
            url =
            `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?numOfRows=100&MobileOS=WIN&MobileApp=App&_type=json&keyword=${searchQuery}&serviceKey=jSLG7PhndCZp9dBtSCY5UGFS4dLgXrtHWCe4JURn1K7VE7UDXwRv9xyHgez0UaGVP8L9%2Bv22bAKf9Uy%2BPWrFeQ%3D%3D`;
        }
        else if(searchQuery && selectedType && !selectedRegion) { //검색어, 장소분류만 입력
            url =
            `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?numOfRows=100&MobileOS=WIN&MobileApp=App&_type=json&keyword=${searchQuery}&contentTypeId=${selectedType}&serviceKey=jSLG7PhndCZp9dBtSCY5UGFS4dLgXrtHWCe4JURn1K7VE7UDXwRv9xyHgez0UaGVP8L9%2Bv22bAKf9Uy%2BPWrFeQ%3D%3D`;
        }
        else if(searchQuery && !selectedType && selectedRegion) { //검색어, 지역만 입력
            url =
            `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?numOfRows=100&MobileOS=WIN&MobileApp=App&_type=json&keyword=${searchQuery}&areaCode=${selectedRegion}&serviceKey=jSLG7PhndCZp9dBtSCY5UGFS4dLgXrtHWCe4JURn1K7VE7UDXwRv9xyHgez0UaGVP8L9%2Bv22bAKf9Uy%2BPWrFeQ%3D%3D`;
        }
        else { 
            url =
            `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?numOfRows=100&MobileOS=WIN&MobileApp=App&_type=json&keyword=%EB%B0%95%EB%AC%BC%EA%B4%80&serviceKey=jSLG7PhndCZp9dBtSCY5UGFS4dLgXrtHWCe4JURn1K7VE7UDXwRv9xyHgez0UaGVP8L9%2Bv22bAKf9Uy%2BPWrFeQ%3D%3D`;
        }

        
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("응답이 없음");
            }
            return response.json();
        })
        .then((data) => {
            setData(data);
        })
        .catch((error) => {
            console.error("데이터 가져오기 오류 발생:", error);
        });
    }, [searchQuery, selectedType, selectedRegion])

    //<p>검색어: {searchQuery}</p>
    //<p>선택된 장소 분류: {selectedType}</p>
    //<p>선택된 지역: {selectedRegion}</p>
    return (
        <>

            <div>
                <AddSearchBox onSearch={handleSearch}/>
            </div>
            <br/>
            <div>
                <AddTypeFilter onSelect={handleTypeChange}/>
                &emsp;
                <AddRegionFilter onSelect={handleRegionChange}/>
            </div>
            <br/>
            <div style={{ display: 'flex'}}>
                <div>
                    <AddMap/>
                </div>
                &emsp;
                <div>
                    <div>
                        <AddWeather cdata = {data}/>
                    </div>
                    <br/>
                    <div>
                        <AddNews cdata = {data}/>
                    </div>
                </div>
            </div>
            <br/>
            <AddBottomBar cdata = {data}/>
        </>
    );
}

export default App;