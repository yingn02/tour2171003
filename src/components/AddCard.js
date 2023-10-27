import React from 'react';
import { Row, Col, Card } from 'antd';
const { Meta } = Card;

const AddCard = function ({ name, address, image }) {

    return (
        <>
            <Card
                hoverable
                style={{
                    width: "240px",
                }}
                cover={<img alt="삭제된 사진입니다." src={image} style={{height: "200px"}}/>}
            >
                <Meta title={name} description={address} />
            </Card>
            <br/>
        </>

    );
}

export default AddCard;