import React, { useState } from 'react';
import { Row, Col, Card, Button, Modal } from 'antd';

const AddCards = function ({ bdata }) {
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 변수

    const [selectedCard, setSelectedCard] = useState(null); // 선택된 카드 정보 저장 변수

    let cardInfo = [];

    if (bdata && bdata.response && bdata.response.body && bdata.response.body.items && bdata.response.body.items.item) {
        cardInfo = bdata.response.body.items.item;
    } else {
        //console.log("데이터 로딩중");
    }

    // 모달 열기 함수
    const openModal = (card) => {
        setSelectedCard(card);
        setIsModalOpen(true);
    };

    // 모달 닫기 함수
    const closeModal = () => {
        setSelectedCard(null);
        setIsModalOpen(false);
    };

    return (
        <>
            <Row gutter={16} style={{ width: "1100px" }}>
                {cardInfo.map((card, i) => (
                    <Col span={6} key={i}>
                        <Card
                            title={card.title}
                            cover={<img alt={card.title} src={card.firstimage} />}
                        >
                            <Button onClick={() => openModal(card)}>열기</Button>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* 모달 컴포넌트 */}
            <Modal
                title="카드 상세 정보"
                open={isModalOpen}
                onOk={closeModal}
                onCancel={closeModal}
            >
                {selectedCard && (
                    <div>
                        <h2>{selectedCard.title}</h2>
                        <p>{selectedCard.addr1}</p>
                        <img src={selectedCard.firstimage} alt={selectedCard.title} />
                    </div>
                )}
            </Modal>
        </>
    );
}

export default AddCards;