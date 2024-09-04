const bexco = [35.168396, 129.133445];

// 아이콘 설정
const iconSize = [80, 80];
const iconAnchor = [40, 80];

// 기본 아이콘
var defaultIcon = L.icon({
    iconUrl: 'img/green_ping.png',
    iconSize: iconSize, // 아이콘 크기
    iconAnchor: iconAnchor // 아이콘의 앵커 지점
});

// 공격 들어올 때 사용되는 아이콘
var alertIcon = L.icon({
    iconUrl: 'img/red_ping.png',
    iconSize: iconSize,
    iconAnchor: iconAnchor
});

var map = L.map('map').setView(bexco, 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

var marker = L.marker(bexco, {icon: defaultIcon}).addTo(map);

var chart; // 차트 객체를 전역 변수로 선언
var chartUpdateInterval;
var mapUpdateInterval; // 지도 업데이트를 위한 interval 변수

// 지도의 실시간 업데이트 시작
function startMapUpdate() {
    mapUpdateInterval = setInterval(function () {
        updateMap(); // 지도 업데이트 함수 호출
    }, 1000); // 1초마다 업데이트
}

function updateMap() {
    // 지도에 대한 업데이트를 여기서 수행 
    // 아래는 예시 코드 (업데이트 될 때 빨간색 됐다가 핑 클릭 시 다시 초록색으로 변경)
    marker.setIcon(alertIcon);
    if (document.getElementById('sidebar').style.display == 'block'){
        marker.setIcon(defaultIcon);
    }
}

marker.on('click', function () {
    // 사이드바를 표시
    document.getElementById('sidebar').style.display = 'block';
    // 시각화 그래프를 표시
    if (!chart) {
        showChart();
    }
    startChartUpdate(); // 차트 실시간 업데이트 시작
});

document.getElementById('closeBtn').onclick = function () {
    // 사이드바를 숨김
    document.getElementById('sidebar').style.display = 'none';
    clearInterval(chartUpdateInterval); // 차트 업데이트 중지
};

function showChart() {
    var ctx = document.getElementById('chart').getContext('2d');

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Data',
                data: [0, 0, 0, 0, 0, 0, 0],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            animation: {
                duration: 1000, // 1초 동안의 애니메이션 설정
                easing: 'easeInOutQuad' // 애니메이션 옵션
            }
        }
    });
}

function startChartUpdate() {
    chartUpdateInterval = setInterval(function () {
        updateChartData();
    }, 1000); // 1초마다 데이터 업데이트
}

function updateChartData() {
    var newData = generateRandomData(); // 새로운 데이터를 생성
    chart.data.datasets[0].data = newData; // 데이터셋의 데이터를 새로운 데이터로 교체
    chart.update(); // 차트를 업데이트하여 변경 사항 반영
}

function generateRandomData() {
    // 랜덤 데이터를 생성하는 함수 (예시)
    return [
        Math.floor(Math.random() * 25),
        Math.floor(Math.random() * 25),
        Math.floor(Math.random() * 25),
        Math.floor(Math.random() * 25),
        Math.floor(Math.random() * 25),
        Math.floor(Math.random() * 25),
        Math.floor(Math.random() * 25)
    ];
}

// 초기화 시 지도 업데이트 시작
startMapUpdate();
