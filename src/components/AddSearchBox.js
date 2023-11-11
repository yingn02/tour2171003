import React, { useState, useEffect, useMemo } from 'react';

function AddSearchBox({ selectedType, selectedRegion, onDataFetched }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [shouldSearch, setShouldSearch] = useState(false);
    
    const handleSearch = () => {
        setShouldSearch(true);
    };

    useEffect(() => {
        let url;

            if (searchQuery && selectedType && selectedRegion) { //전부 입력
                url =
                    `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?numOfRows=100&MobileOS=WIN&MobileApp=App&_type=json&keyword=${searchQuery}&contentTypeId=${selectedType}&areaCode=${selectedRegion}&serviceKey=jSLG7PhndCZp9dBtSCY5UGFS4dLgXrtHWCe4JURn1K7VE7UDXwRv9xyHgez0UaGVP8L9%2Bv22bAKf9Uy%2BPWrFeQ%3D%3D`;
            }
            else if (searchQuery && !selectedType && !selectedRegion) { //검색어만 입력
                url =
                    `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?numOfRows=100&MobileOS=WIN&MobileApp=App&_type=json&keyword=${searchQuery}&serviceKey=jSLG7PhndCZp9dBtSCY5UGFS4dLgXrtHWCe4JURn1K7VE7UDXwRv9xyHgez0UaGVP8L9%2Bv22bAKf9Uy%2BPWrFeQ%3D%3D`;
            }
            else if (searchQuery && selectedType && !selectedRegion) { //검색어, 장소분류만 입력
                url =
                    `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?numOfRows=100&MobileOS=WIN&MobileApp=App&_type=json&keyword=${searchQuery}&contentTypeId=${selectedType}&serviceKey=jSLG7PhndCZp9dBtSCY5UGFS4dLgXrtHWCe4JURn1K7VE7UDXwRv9xyHgez0UaGVP8L9%2Bv22bAKf9Uy%2BPWrFeQ%3D%3D`;
            }
            else if (searchQuery && !selectedType && selectedRegion) { //검색어, 지역만 입력
                url =
                    `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?numOfRows=100&MobileOS=WIN&MobileApp=App&_type=json&keyword=${searchQuery}&areaCode=${selectedRegion}&serviceKey=jSLG7PhndCZp9dBtSCY5UGFS4dLgXrtHWCe4JURn1K7VE7UDXwRv9xyHgez0UaGVP8L9%2Bv22bAKf9Uy%2BPWrFeQ%3D%3D`;
            }
            else {
                url =
                    `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?numOfRows=100&MobileOS=WIN&MobileApp=App&_type=json&keyword=%EC%84%9C%EC%9A%B8&serviceKey=jSLG7PhndCZp9dBtSCY5UGFS4dLgXrtHWCe4JURn1K7VE7UDXwRv9xyHgez0UaGVP8L9%2Bv22bAKf9Uy%2BPWrFeQ%3D%3D`;
                
            }

            fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("응답이 없음");
                    }
                    return response.json();
                })
                .then((data) => {
                    onDataFetched(data);
                })
                .catch((error) => {
                    console.error("데이터 가져오기 오류(AddSearchBox):", error);
                })

            setShouldSearch(false);
        
    }, [selectedType, selectedRegion, shouldSearch]);

    return (
        <div>
            <input
                type="text"
                placeholder="검색 예) 박물관"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            &emsp;
            <button onClick={handleSearch}>검색</button>
        </div>
    );
}

export default AddSearchBox;