import '../styles/AddMap.css';
const { kakao } = window;

const MapScript = function () {
    // 마커를 클릭했을 때 해당 장소의 상세정보를 보여줄 커스텀오버레이입니다
    var placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 }),
        contentNode = document.createElement('div'), // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다 
        markers = [], // 마커를 담을 배열입니다
        currCategory = ''; // 현재 선택된 카테고리를 가지고 있을 변수입니다

    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = {
            center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
            level: 5 // 지도의 확대 레벨
        };

    // 지도를 생성합니다    
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places(map);

    // 지도에 idle 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'idle', searchPlaces);

    // 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다 
    contentNode.className = 'placeinfo_wrap';

    // 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
    // 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드를 등록합니다 
    addEventHandle(contentNode, 'mousedown', kakao.maps.event.preventMap);
    addEventHandle(contentNode, 'touchstart', kakao.maps.event.preventMap);

    // 커스텀 오버레이 컨텐츠를 설정합니다
    placeOverlay.setContent(contentNode);

    // 각 카테고리에 클릭 이벤트를 등록합니다
    addCategoryClickEvent();

    // 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다
    function addEventHandle(target, type, callback) {
        if (target.addEventListener) {
            target.addEventListener(type, callback);
        } else {
            target.attachEvent('on' + type, callback);
        }
    }

    // 카테고리 검색을 요청하는 함수입니다
    function searchPlaces() {
        if (!currCategory) {
            return;
        }

        // 커스텀 오버레이를 숨깁니다 
        placeOverlay.setMap(null);

        // 지도에 표시되고 있는 마커를 제거합니다
        removeMarker();

        ps.categorySearch(currCategory, placesSearchCB, { useMapBounds: true });
    }

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {

            // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
            displayPlaces(data);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요

        } else if (status === kakao.maps.services.Status.ERROR) {
            // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요

        }
    }

    // 지도에 마커를 표출하는 함수입니다
    function displayPlaces(places) {

        // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
        // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
        var order = document.getElementById(currCategory).getAttribute('data-order');



        for (var i = 0; i < places.length; i++) {

            // 마커를 생성하고 지도에 표시합니다
            var marker = addMarker(new kakao.maps.LatLng(places[i].y, places[i].x), order);

            // 마커와 검색결과 항목을 클릭 했을 때
            // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
            (function (marker, place) {
                kakao.maps.event.addListener(marker, 'click', function () {
                    displayPlaceInfo(place);
                });
            })(marker, places[i]);
        }
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    function addMarker(position, order) {
        var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
            imageSize = new kakao.maps.Size(27, 28),  // 마커 이미지의 크기
            imgOptions = {
                spriteSize: new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
                spriteOrigin: new kakao.maps.Point(46, (order * 36)), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                offset: new kakao.maps.Point(11, 28) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
            },
            markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new kakao.maps.Marker({
                position: position, // 마커의 위치
                image: markerImage
            });

        marker.setMap(map); // 지도 위에 마커를 표출합니다
        markers.push(marker);  // 배열에 생성된 마커를 추가합니다

        return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        markers = [];
    }

    // 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
    function displayPlaceInfo(place) {
        var content = '<div class="placeinfo">' +
            '   <a class="title" href="' + place.place_url + '" target="_blank" title="' + place.place_name + '">' + place.place_name + '</a>';

        if (place.road_address_name) {
            content += '    <span title="' + place.road_address_name + '">' + place.road_address_name + '</span>' +
                '  <span class="jibun" title="' + place.address_name + '">(지번 : ' + place.address_name + ')</span>';
        } else {
            content += '    <span title="' + place.address_name + '">' + place.address_name + '</span>';
        }

        content += '    <span class="tel">' + place.phone + '</span>' +
            '</div>' +
            '<div class="after"></div>';

        contentNode.innerHTML = content;
        placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
        placeOverlay.setMap(map);
    }


    // 각 카테고리에 클릭 이벤트를 등록합니다
    function addCategoryClickEvent() {
        var category = document.getElementById('category'),
            children = category.children;

        for (var i = 0; i < children.length; i++) {
            children[i].onclick = onClickCategory;
        }
    }

    // 카테고리를 클릭했을 때 호출되는 함수입니다
    function onClickCategory() {
        var id = this.id,
            className = this.className;

        placeOverlay.setMap(null);

        if (className === 'on') {
            currCategory = '';
            changeCategoryClass();
            removeMarker();
        } else {
            currCategory = id;
            changeCategoryClass(this);
            searchPlaces();
        }
    }

    // 클릭된 카테고리에만 클릭된 스타일을 적용하는 함수입니다
    function changeCategoryClass(el) {
        var category = document.getElementById('category'),
            children = category.children,
            i;

        for (i = 0; i < children.length; i++) {
            children[i].className = '';
        }

        if (el) {
            el.className = 'on';
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////

    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    var mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    ////////////////////////////////////////////////////////////////////////////////////

    var overlayOn = false, // 지도 위에 로드뷰 오버레이가 추가된 상태를 가지고 있을 변수
        container = document.getElementById('container'), // 지도와 로드뷰를 감싸고 있는 div 입니다
        mapWrapper = document.getElementById('mapWrapper'), // 지도를 감싸고 있는 div 입니다
        mapContainer = document.getElementById('map'), // 지도를 표시할 div 입니다 
        rvContainer = document.getElementById('roadview'); //로드뷰를 표시할 div 입니다

    var mapCenter = new kakao.maps.LatLng(33.45042, 126.57091), // 지도의 중심좌표
        mapOption = {
            center: mapCenter, // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };

    // 지도를 표시할 div와 지도 옵션으로 지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // 로드뷰 객체를 생성합니다 
    var rv = new kakao.maps.Roadview(rvContainer);

    // 좌표로부터 로드뷰 파노라마 ID를 가져올 로드뷰 클라이언트 객체를 생성합니다 
    var rvClient = new kakao.maps.RoadviewClient();

    // 로드뷰에 좌표가 바뀌었을 때 발생하는 이벤트를 등록합니다 
    kakao.maps.event.addListener(rv, 'position_changed', function () {

        // 현재 로드뷰의 위치 좌표를 얻어옵니다 
        var rvPosition = rv.getPosition();

        // 지도의 중심을 현재 로드뷰의 위치로 설정합니다
        map.setCenter(rvPosition);

        // 지도 위에 로드뷰 도로 오버레이가 추가된 상태이면
        if (overlayOn) {
            // 마커의 위치를 현재 로드뷰의 위치로 설정합니다
            marker.setPosition(rvPosition);
        }
    });

    // 마커 이미지를 생성합니다
    var markImage = new kakao.maps.MarkerImage(
        'https://t1.daumcdn.net/localimg/localimages/07/2018/pc/roadview_minimap_wk_2018.png',
        new kakao.maps.Size(26, 46),
        {
            // 스프라이트 이미지를 사용합니다.
            // 스프라이트 이미지 전체의 크기를 지정하고
            spriteSize: new kakao.maps.Size(1666, 168),
            // 사용하고 싶은 영역의 좌상단 좌표를 입력합니다.
            // background-position으로 지정하는 값이며 부호는 반대입니다.
            spriteOrigin: new kakao.maps.Point(705, 114),
            offset: new kakao.maps.Point(13, 46)
        }
    );

    // 드래그가 가능한 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        image: markImage,
        position: mapCenter,
        draggable: true
    });

    // 마커에 dragend 이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'dragend', function (mouseEvent) {

        // 현재 마커가 놓인 자리의 좌표입니다 
        var position = marker.getPosition();

        // 마커가 놓인 위치를 기준으로 로드뷰를 설정합니다
        toggleRoadview(position);
    });

    //지도에 클릭 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'click', function (mouseEvent) {

        // 지도 위에 로드뷰 도로 오버레이가 추가된 상태가 아니면 클릭이벤트를 무시합니다 
        if (!overlayOn) {
            return;
        }

        // 클릭한 위치의 좌표입니다 
        var position = mouseEvent.latLng;

        // 마커를 클릭한 위치로 옮깁니다
        marker.setPosition(position);

        // 클락한 위치를 기준으로 로드뷰를 설정합니다
        toggleRoadview(position);
    });

    // 전달받은 좌표(position)에 가까운 로드뷰의 파노라마 ID를 추출하여
    // 로드뷰를 설정하는 함수입니다
    function toggleRoadview(position) {
        rvClient.getNearestPanoId(position, 50, function (panoId) {
            // 파노라마 ID가 null 이면 로드뷰를 숨깁니다
            if (panoId === null) {
                toggleMapWrapper(true, position);
            } else {
                toggleMapWrapper(false, position);

                // panoId로 로드뷰를 설정합니다
                rv.setPanoId(panoId, position);
            }
        });
    }

    // 지도를 감싸고 있는 div의 크기를 조정하는 함수입니다
    function toggleMapWrapper(active, position) {
        if (active) {

            // 지도를 감싸고 있는 div의 너비가 100%가 되도록 class를 변경합니다 
            container.className = '';

            // 지도의 크기가 변경되었기 때문에 relayout 함수를 호출합니다
            map.relayout();

            // 지도의 너비가 변경될 때 지도중심을 입력받은 위치(position)로 설정합니다
            map.setCenter(position);
        } else {

            // 지도만 보여지고 있는 상태이면 지도의 너비가 50%가 되도록 class를 변경하여
            // 로드뷰가 함께 표시되게 합니다
            if (container.className.indexOf('view_roadview') === -1) {
                container.className = 'view_roadview';

                // 지도의 크기가 변경되었기 때문에 relayout 함수를 호출합니다
                map.relayout();

                // 지도의 너비가 변경될 때 지도중심을 입력받은 위치(position)로 설정합니다
                map.setCenter(position);
            }
        }
    }

    //지도 위의 로드뷰 도로 오버레이를 추가,제거하는 함수입니다
    function toggleOverlay(active) {
        if (active) {
            overlayOn = true;

            // 지도 위에 로드뷰 도로 오버레이를 추가합니다
            map.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);

            // 지도 위에 마커를 표시합니다
            marker.setMap(map);

            // 마커의 위치를 지도 중심으로 설정합니다 
            marker.setPosition(map.getCenter());

            // 로드뷰의 위치를 지도 중심으로 설정합니다
            toggleRoadview(map.getCenter());
        } else {
            overlayOn = false;

            // 지도 위의 로드뷰 도로 오버레이를 제거합니다
            map.removeOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);

            // 지도 위의 마커를 제거합니다
            marker.setMap(null);
        }
    }

    //지도 위의 로드뷰 버튼을 눌렀을 때 호출되는 함수입니다
    function setRoadviewRoad() {
        var control = document.getElementById('roadviewControl');

        // 버튼이 눌린 상태가 아니면
        if (control.className.indexOf('active') === -1) {
            control.className = 'active';

            // 로드뷰 도로 오버레이가 보이게 합니다
            toggleOverlay(true);
        } else {
            control.className = '';

            // 로드뷰 도로 오버레이를 제거합니다
            toggleOverlay(false);
        }
    }

    // 로드뷰에서 X버튼을 눌렀을 때 로드뷰를 지도 뒤로 숨기는 함수입니다
    function closeRoadview() {
        var position = marker.getPosition();
        toggleMapWrapper(true, position);
    }

    //return ();
};

export default MapScript;