import React, { useState, useEffect } from 'react';
const { kakao } = window;

//이 컴포넌트는 검색창에 쓰여진 지역을 네이버 뉴스api에 보내서 검색결과를 응답받고 출력합니다
const AddNews = function ({ cdata, search }) {
    const [data, setData] = useState(null); //뉴스검색결과
    let [r, setR] = useState("서울"); //검색어

    useEffect(() => {
        setR(search);

        ///// 올바른 검색어인가 확인 (시작)/////
        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(search, function (result, status) {
            if (status !== kakao.maps.services.Status.OK) { //검색결과 없을 시 - 서울
                setR("서울");
            }
        });
        ///// 올바른 검색어인가 확인 (끝)/////
       
        let url = `/v1/search/news.json?query=${r}&display=10&start=1&sort=sim`;

        fetch(url, {
            headers: {
                "X-Naver-Client-Id": "E_E3qYAz_RU8Cgal2wDM",
                "X-Naver-Client-Secret": "pcDLWEldn2"
            }
        })
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
                console.error("데이터 가져오기 오류(AddNews):", error);
            });

    }, [cdata])

    return (
        <>
            <div style={{ border: '2px solid skyblue', padding: '10px' }}>
                <h4 style={{ margin: '0px' }}>관련뉴스</h4>
                {data &&
                    data.items.map((news, i) => (
                        <p
                            style={{ fontSize: "10px", color: "blue", cursor: "pointer" }}
                            key={i}
                            onClick={() => { window.open(news.link, 'NewWindow', 'width=600, height=400') }}
                        >
                            {news.title.replace(/<\/?b>|&quot;|&gt;/g, '')}
                        </p>
                    ))}
            </div>
        </>
    );
}

export default AddNews;