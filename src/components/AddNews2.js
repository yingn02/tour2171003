//https://blog.zarathu.com/posts/2023-02-15-searchapi-with-python/
import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';

const AddNews = function ({ cdata }) {
    ///Modal///
    const [isModalOpen, setIsModalOpen] = useState([]);//false

    // const showModal = () => {
    //     setIsModalOpen(true);
    // };

    // const handleOk = () => {
    //     setIsModalOpen(false);
    // };

    // const handleCancel = () => {
    //     setIsModalOpen(false);
    // };

    const openModal = (index) => {
        // 해당 인덱스의 모달을 열기 위해 모달 상태 배열 업데이트
        const updatedModals = [...isModalOpen];
        updatedModals[index] = true;
        setIsModalOpen(updatedModals);
    };

    const closeModal = (index) => {
        // 해당 인덱스의 모달을 닫기 위해 모달 상태 배열 업데이트
        const updatedModals = [...isModalOpen];
        updatedModals[index] = false;
        setIsModalOpen(updatedModals);
    };

    //////


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
                //Authorization: "KakaoAK 42aea0a9544189e3bed25b9e54036aea"
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
                // 모달 상태 배열 초기화
                const initialModals = new Array(data.items.length).fill(false);
                setIsModalOpen(initialModals);
            })
            .catch((error) => {
                console.error("데이터 가져오기 오류(AddNews2):", error);
            });
    }, [cdata])


    return (
        <>
            <h4>관련뉴스</h4>
            <div>
                {data &&
                    data.items.map((news, i) => (
                        <p
                            style={{ fontSize: "10px" }}
                            key={i}
                            //onClick={() => openModal(i)}
                            onClick={() => {window.open(news.link, 'NewWindow', 'width=600, height=400')}}
                        >
                            {news.title.replace(/<\/?b>/g, '')}
                        </p>
                    ))}
            </div>
            {data &&
                data.items.map((news, i) => (
                    <Modal
                        key={i}
                        title="Basic Modal"
                        open={isModalOpen[i]}
                        onOk={() => closeModal(i)}
                        onCancel={() => closeModal(i)}
                    >
                       
                       {news.link}
                       
    
                    </Modal>
            ))}
        </>
    );
}

export default AddNews;