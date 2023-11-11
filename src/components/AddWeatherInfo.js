import React from 'react';

//이 컴포넌트는 AddWeatherUI로 부터 받은 지역정보를 표시하고,
//그 아래에는 AddWeatherUI로 부터 받은 날씨 예측정보를 토대로 정보를 출력합니다.
const AddWeatherInfo = function ({ region, wdata }) {
    let weatherInfo = [];

    if (wdata && wdata.response && wdata.response.body && wdata.response.body.items && wdata.response.body.items.item) {
        weatherInfo = wdata.response.body.items.item;
    
        let daySky; //오전날씨
        let dayTmp = weatherInfo[36].fcstValue; //오전 기온
        let nightSky = weatherInfo[145 + 5].fcstValue; //오후날씨
        let nightTmp = weatherInfo[145].fcstValue; //오후 기온
        let dayImg; //오전 날씨 아이콘
        let nightImg; //오후 날씨 아이콘
    

        //기본 날씨 (오전)
        if (weatherInfo[36 + 5].fcstValue == 1) daySky = "맑음";
        else if (weatherInfo[36 + 5].fcstValue == 3) daySky = "구름많음";
        else if (weatherInfo[36 + 5].fcstValue == 4) daySky = "흐림";

        //비가 올 경우 업데이트 (오전)
        if (weatherInfo[36 + 6].fcstValue == 1) daySky = "비";
        else if (weatherInfo[36 + 6].fcstValue == 2) daySky = "비/눈";
        else if (weatherInfo[36 + 6].fcstValue == 3) daySky = "눈";
        else if (weatherInfo[36 + 6].fcstValue == 4) daySky = "소나기";

        //기본 날씨(오후)
        if (weatherInfo[145 + 5].fcstValue == 1) nightSky = "맑음";
        else if (weatherInfo[145 + 5].fcstValue == 3) nightSky = "구름많음";
        else if (weatherInfo[145 + 5].fcstValue == 4) nightSky = "흐림";

        //비가 올 경우 업데이트 (오후)
        if (weatherInfo[145 + 6].fcstValue == 1) nightSky = "비";
        else if (weatherInfo[145 + 6].fcstValue == 2) nightSky = "비/눈";
        else if (weatherInfo[145 + 6].fcstValue == 3) nightSky = "눈";
        else if (weatherInfo[145 + 6].fcstValue == 4) nightSky = "소나기";

        //날씨 아이콘 (오전)
        if (daySky == "맑음") dayImg = "img/맑음.jpg";
        else if (daySky == "구름많음") dayImg = "img/구름많음.jpg";
        else if (daySky == "흐림") dayImg = "img/흐림.jpg";
        else if (daySky == "비") dayImg = "img/비.jpg";
        else if (daySky == "비/눈") dayImg = "img/비/눈.jpg";
        else if (daySky == "눈") dayImg = "img/눈.jpg";
        else if (daySky == "소나기") dayImg = "img/비.jpg";

        //날씨 아이콘 (오후)
        if (nightSky == "맑음") nightImg = "img/맑음.jpg";
        else if (nightSky == "구름많음") nightImg = "img/구름많음.jpg";
        else if (nightSky == "흐림") nightImg = "img/흐림.jpg";
        else if (nightSky == "비") nightImg = "img/비.jpg";
        else if (nightSky == "비/눈") nightImg = "img/비/눈.jpg";
        else if (nightSky == "눈") nightImg = "img/눈.jpg";
        else if (nightSky == "소나기") nightImg = "img/비.jpg";

        return (
            <>
                <div>
                    <div style={{border: '2px solid skyblue'}}>
                        <h4 style={{margin:'5px'}}>{region}</h4>
                    </div>

                    <div style={{ display: 'flex', textAlign: 'center', border: '2px solid skyblue' }}>
                        <div style={{ padding: '15px'}}>
                            <img src={dayImg} />
                            <br />
                            <strong>오전</strong>
                            <br />
                            <strong>{daySky}</strong>
                            <br />
                            <strong>{dayTmp}º</strong>
                        </div>
                        &emsp;
                        <div style={{ padding: '15px'}}>
                            <img src={nightImg} />
                            <br />
                            <strong>오후</strong>
                            <br />
                            <strong>{nightSky}</strong>
                            <br />
                            <strong>{nightTmp}º</strong>
                        </div>
                    </div>
                </div>

            </>

        );

    }
}

export default AddWeatherInfo;