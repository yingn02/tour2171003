import React, { useState, useEffect } from 'react';

const AddNews = function ({ cdata }) {
    const [data, setData] = useState(null); //data 저장

    var i, n = 0;
    let oldr, r = "";

    if (cdata && cdata.response && cdata.response.body && cdata.response.body.items && cdata.response.body.items.item) {
        oldr = cdata.response.body.items.item[1].addr1;
        for (i = 0; i < oldr.length; i++) { //ㅇㅇ시 ㅇㅇ동 ... -> ㅇㅇ시 ㅇㅇ동
            if (oldr[i] === " ") {
                r += (oldr[i]);
                n++;
                if (n >= 1) break;
            }
            else r += (oldr[i]);
        }
        //console.log(r);
    }
    else {
        //console.log("데이터 로딩중");
    }

    useEffect(() => {
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
                //console.log(data);
                setData(data);
            })
            .catch((error) => {
                console.error("데이터 가져오기 오류(AddNews):", error);
            });
    }, [cdata])


    return (
        <>
            
            <div style={{ border: '2px solid skyblue', padding: '10px'}}>
                <h4 style={{margin: '0px'}}>관련뉴스</h4>
                    {data &&
                        data.items.map((news, i) => (
                            <p
                                style={{ fontSize: "10px", color:"blue", cursor: "pointer"}}
                                key={i}
                                onClick={() => { window.open(news.link, 'NewWindow', 'width=600, height=400') }}
                            >
                                {news.title.replace(/<\/?b>/g, '')}
                            </p>
                        ))}
            </div>

        </>
    );
}

export default AddNews;