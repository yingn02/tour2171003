//https://blog.zarathu.com/posts/2023-02-15-searchapi-with-python/
import React, { useState, useEffect } from 'react';
const AddNews = function ({ cdata }) {
    const [data, setData] = useState(null); //data 저장
    var i, n = 0;
    let oldr, r = "";

    if (cdata && cdata.response && cdata.response.body && cdata.response.body.items && cdata.response.body.items.item) {
        oldr = cdata.response.body.items.item[0].addr1;
        for (i = 0; i < oldr.length; i++) { //ㅇㅇ시 ㅇㅇ동 ... -> ㅇㅇ시 ㅇㅇ동
            if (oldr[i] === " ") {
                r += (oldr[i]);
                n++;
                if (n >= 2) break;
            }
            else r += (oldr[i]);
        }
        //console.log(r);
    }
    else {
        console.log("데이터 로딩중");
    }

    //useEffect(() => {
    let url = `https://dapi.kakao.com/v2/search/web?sort=accuracy&page=1&size=10&query=${r}+%EB%89%B4%EC%8A%A4`;

    fetch(url, {
        headers: {
            Authorization: "KakaoAK 42aea0a9544189e3bed25b9e54036aea"
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("응답이 없음");
            }
            return response.json(); // JSON으로 파싱된 데이터를 반환
        })
        .then((data) => {
            //여기에 JSON 데이터를 사용하거나 처리
            //console.log(data.documents);
            setData(data);
        })
        .catch((error) => {
            console.error("데이터 가져오기 오류 발생:", error);
        });

    //}, [])


    return (
        <>
            <h4>관련뉴스</h4>
            {data && data.documents.map((news, i) => <p style={{ fontSize: "12px" }} key={i}>{news.title.replace(/<\/?b>/g, '')}</p>)}

        </>
    );
}

export default AddNews;