import AddBottomCard from './AddBottomCard';
import { Row, Col } from 'antd';

//이 컴포넌트는 검색결과의 수만큼 카드를 띄웁니다.
//그리고 카드들의 정렬을 담당합니다.
//각 카드에 대한 정보는 AddBottomCards가 아니라, AddBottomCard가 표시합니다.
//AddBottomCard에는 App에서의 검색결과를 넘겨줍니다
const AddBottomCards = function ({ bdata }) {
    let cardInfo = [];

    if (bdata && bdata.response && bdata.response.body && bdata.response.body.items && bdata.response.body.items.item) {
        cardInfo = bdata.response.body.items.item;
    }

    return (
        <>
            <Row gutter={0} style={{ width: "1100px" }}>
                {
                    cardInfo.map((card, i) =>
                        <Col span={6} key={i}>
                            <AddBottomCard
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

export default AddBottomCards;