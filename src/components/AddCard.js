import React, { useState } from 'react';
import { Row, Col, Card } from 'antd';
import { Button, Modal } from 'antd';

const { Meta } = Card;

const AddCard = function ({ data, name, address, image }) {
    const [isModalOpen, setIsModalOpen] = useState(false);//
    const [selectedCard, setSelectedCard] = useState(null);//

    //모달 열기
    const openModal = (card) => {
        setSelectedCard(card);
        setIsModalOpen(true);
    };

    //모달 닫기
    const closeModal = () => {
        setSelectedCard(null);
        setIsModalOpen(false);
    };

    return (
        <>
            <Card
                onClick={() => openModal(data)}
                hoverable
                style={{
                    width: "240px",
                }}
                cover={<img alt="삭제된 사진입니다." src={image} style={{ height: "200px" }} />}
            >
                <Meta title={name} description={address} />
            </Card>
            <br />
            <Modal
                title="크게 보기"
                open={isModalOpen}
                onOk={closeModal}
                onCancel={closeModal}
            >
                {selectedCard && (
                    <div>
                        <h2>{selectedCard.title}</h2>
                        <p>{selectedCard.addr1}</p>
                        <img style={{width: "450px"}} src={selectedCard.firstimage} alt="삭제된 사진입니다."/>

                    </div>
                )}
            </Modal>
        </>

    );
}

export default AddCard;