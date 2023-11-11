import React, { useState, useMemo } from 'react';
const { kakao } = window;

//이 컴포넌트는 검색창의 UI를 담당하고, 검색어와 장소분류선택을 조합하여 검색결과를 요청합니다
//응답받은 검색결과를 App 컴포넌트에 보냅니다
function AddSearchBox({ selectedType, onDataFetched, searchQuery, setSearchQuery }) {
    const [shouldSearch, setShouldSearch] = useState(false); //useMemo의 의존성배열
    
    const handleSearch = () => { //검색버튼이 눌리면 의존성배열을 변경시킨다
        setShouldSearch(true);
    };

    useMemo(() => {

        let url;

            if (searchQuery && !selectedType) { //검색어만 입력
                url =
                    `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?numOfRows=100&MobileOS=WIN&MobileApp=App&_type=json&keyword=${searchQuery}&serviceKey=jSLG7PhndCZp9dBtSCY5UGFS4dLgXrtHWCe4JURn1K7VE7UDXwRv9xyHgez0UaGVP8L9%2Bv22bAKf9Uy%2BPWrFeQ%3D%3D`;
            }
            else if (searchQuery && selectedType) { //검색어, 장소분류선택 입력
                url =
                    `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?numOfRows=100&MobileOS=WIN&MobileApp=App&_type=json&keyword=${searchQuery}&contentTypeId=${selectedType}&serviceKey=jSLG7PhndCZp9dBtSCY5UGFS4dLgXrtHWCe4JURn1K7VE7UDXwRv9xyHgez0UaGVP8L9%2Bv22bAKf9Uy%2BPWrFeQ%3D%3D`;
            }
            else { //default - 검색어: 서울
                url =
                    `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?numOfRows=100&MobileOS=WIN&MobileApp=App&_type=json&keyword=%EC%84%9C%EC%9A%B8&serviceKey=jSLG7PhndCZp9dBtSCY5UGFS4dLgXrtHWCe4JURn1K7VE7UDXwRv9xyHgez0UaGVP8L9%2Bv22bAKf9Uy%2BPWrFeQ%3D%3D`;
            }

        ///// 올바른 검색어인가 확인 (시작)/////
        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(searchQuery, function (result, status) {
            if (status !== kakao.maps.services.Status.OK) { //정상적으로 검색되면 좌표와 검색어 업데이트
                url =
                    `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?numOfRows=100&MobileOS=WIN&MobileApp=App&_type=json&keyword=%EC%84%9C%EC%9A%B8&serviceKey=jSLG7PhndCZp9dBtSCY5UGFS4dLgXrtHWCe4JURn1K7VE7UDXwRv9xyHgez0UaGVP8L9%2Bv22bAKf9Uy%2BPWrFeQ%3D%3D`;
            }
            
        });
        ///// 올바른 검색어인가 확인 (끝)/////

            fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("응답이 없음");
                    }
                    return response.json();
                })
                .then((data) => {
                    onDataFetched(data); //응답받은 검색결과를 App 컴포넌트에 보낸다
                })
                .catch((error) => {
                    console.error("데이터 가져오기 오류(AddSearchBox):", error);
                })

            setShouldSearch(false); //useMemo의 의존성배열 원위치
        
    }, [selectedType, shouldSearch]); //selectedType - 검색버튼을 누르지않고 장소분류선택을 해도 검색결과가 변경됨

    return (
        <div>
            <input
                type="text"
                placeholder=""
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            &emsp;
            <button onClick={handleSearch}>검색</button>
        </div>
    );
}

export default AddSearchBox;