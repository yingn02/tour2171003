import AddCard from './AddCard';
import React, { useState } from 'react';
import { Row, Col, Card } from 'antd';

const AddCards = function ({ bdata }) {
    let cardInfo = [];

    if (bdata && bdata.response && bdata.response.body && bdata.response.body.items && bdata.response.body.items.item) {
        cardInfo = bdata.response.body.items.item;
    }
    else {
        
    }

    return (
        <>
            <Row gutter={0} style={{ width: "1100px" }}>
                {
                    cardInfo.map((card, i) =>
                        <Col span={6} key={i}>
                            <AddCard
                            data={card}
                            name={card.title}
                            address={card.addr1}
                            image={card.firstimage}
                            />
                        </Col>)
                }
            </Row>
        </>


    );
}

export default AddCards;