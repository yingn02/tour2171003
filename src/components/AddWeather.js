import React, { useState, useEffect } from 'react';
import AddRegionWeather from './AddRegionWeather';
import { wait } from '@testing-library/user-event/dist/utils';
//jSLG7PhndCZp9dBtSCY5UGFS4dLgXrtHWCe4JURn1K7VE7UDXwRv9xyHgez0UaGVP8L9%2Bv22bAKf9Uy%2BPWrFeQ%3D%3D
//jSLG7PhndCZp9dBtSCY5UGFS4dLgXrtHWCe4JURn1K7VE7UDXwRv9xyHgez0UaGVP8L9+v22bAKf9Uy+PWrFeQ==

const AddWeather = function ({ cdata }) {
  const [data, setData] = useState();
  var i, n=0;
  let x, y, oldr, r="";
  let today = new Date();
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1;  // 월
  let date = today.getDate();  // 날짜
  //console.log(""+year+month+date);

  if (cdata && cdata.response && cdata.response.body && cdata.response.body.items && cdata.response.body.items.item) {
    x = cdata.response.body.items.item[1].mapx;
    y = cdata.response.body.items.item[1].mapy;
    oldr = cdata.response.body.items.item[1].addr1;
    
    for(i=0; i<oldr.length; i++) { //ㅇㅇ시 ㅇㅇ동 ... ... -> ㅇㅇ시 ㅇㅇ동
      if(oldr[i] === " ") {
        r += (oldr[i]);
        n++;
        if(n >= 2) break;
      }
      else r += (oldr[i]);
    }
    //console.log(r);
  }
  else {
    //console.log("데이터 로딩중");
  }

  /////기상청에서 제공한 GPS -> GRID 좌표변환 코드 (시작)/////
  var RE = 6371.00877; // 지구 반경(km)
  var GRID = 5.0; // 격자 간격(km)
  var SLAT1 = 30.0; // 투영 위도1(degree)
  var SLAT2 = 60.0; // 투영 위도2(degree)
  var OLON = 126.0; // 기준점 경도(degree)
  var OLAT = 38.0; // 기준점 위도(degree)
  var XO = 43; // 기준점 X좌표(GRID)
  var YO = 136; // 기준점 Y좌표(GRID)

  var rs = dfs_xy_conv("toXY", y, x);
  //console.log(rs.x, rs.y);

  function dfs_xy_conv(code, v1, v2) {
    var DEGRAD = Math.PI / 180.0;
    var RADDEG = 180.0 / Math.PI;

    var re = RE / GRID;
    var slat1 = SLAT1 * DEGRAD;
    var slat2 = SLAT2 * DEGRAD;
    var olon = OLON * DEGRAD;
    var olat = OLAT * DEGRAD;

    var sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
    var sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
    var ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
    ro = re * sf / Math.pow(ro, sn);
    var rs = {};
    if (code == "toXY") {
      rs['lat'] = v1;
      rs['lng'] = v2;
      var ra = Math.tan(Math.PI * 0.25 + (v1) * DEGRAD * 0.5);
      ra = re * sf / Math.pow(ra, sn);
      var theta = v2 * DEGRAD - olon;
      if (theta > Math.PI) theta -= 2.0 * Math.PI;
      if (theta < -Math.PI) theta += 2.0 * Math.PI;
      theta *= sn;
      rs['x'] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
      rs['y'] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
    }

    return rs;
  }
  /////기상청에서 제공한 GPS -> GRID 좌표변환 코드 (끝)/////
  useEffect(() => {
    let url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=jSLG7PhndCZp9dBtSCY5UGFS4dLgXrtHWCe4JURn1K7VE7UDXwRv9xyHgez0UaGVP8L9%2Bv22bAKf9Uy%2BPWrFeQ%3D%3D&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${""+year+month+date-1}&base_time=0500&nx=${rs.x}&ny=${rs.y}`;

    fetch(url)
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
        console.error("데이터 가져오기 오류 발생:", error);
      });
  }, [data]);



  return (
    <>
      <AddRegionWeather region={r} wdata={data} />
    </>
  );
};


export default AddWeather;