let mapUpdateInterval=false; 



// 기기 위치
const bexco = [35.168396, 129.133445];
const test1 = [35.168390, 129.130000];
const test2 = [35.167000, 129.130500];

// 아이콘 설정
const iconSize = [80, 80];
const iconAnchor = [40, 80];

// 기본 아이콘
let defaultIcon = L.icon({
    iconUrl: 'img/green_ping.png',
    iconSize: iconSize, 
    iconAnchor: iconAnchor 
});

// 공격 들어올 때 사용되는 아이콘
let alertIcon = L.icon({
    iconUrl: 'img/red_ping.png',
    iconSize: iconSize,
    iconAnchor: iconAnchor
});

//맵 생성
let map = L.map('map').setView(bexco, 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, minZoom: 14
}).addTo(map);




//마커 생성
let bexcoMarker = L.marker(bexco, {icon: defaultIcon}).addTo(map);
let test1Marker = L.marker(test1, {icon: defaultIcon}).addTo(map);
let test2Marker = L.marker(test2, {icon: defaultIcon}).addTo(map);

// 지도의 실시간 업데이트

function startMapUpdate() {
    mapUpdateInterval = setInterval(function () {
        updateMap(); 
    }, 1000);
}


function updateMap() {
    // 지도에 대한 업데이트를 여기서 수행 

    
    /* 
    if (특정 기기에 공격이 들어온다면) {
        특정기기의 핑.setIcon(alertIcon);
    }

    */

    // 아래는 예시 코드 (업데이트 될 때 빨간색 됐다가 핑 클릭 시 다시 초록색으로 변경)
    bexcoMarker.setIcon(alertIcon);
    
}



// function startChartUpdate() {
//     chartUpdateInterval = setInterval(function () {
//         updateChartData();
//     }, 1000); // 1초마다 데이터 업데이트
// }

// function updateChartData() {
//     let newData = generateRandomData(); // 새로운 데이터를 생성
//     line_chart.data.datasets[0].data = newData; // 데이터셋의 데이터를 새로운 데이터로 교체
//     line_chart.update(); // 차트를 업데이트하여 변경 사항 반영

//     let doughnutNewData = genRandData();
//     doughnut_chart.data.datasets[0].data=doughnutNewData;
//     doughnut_chart.update();
// }

// 초기화 시 지도 업데이트 시작
startMapUpdate();








