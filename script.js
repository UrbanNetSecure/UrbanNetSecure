const bexco = [35.168396, 129.133445];

// 아이콘 설정
const iconSize = [80, 80];
const iconAnchor = [40, 80];

// 기본 아이콘
var defaultIcon = L.icon({
    iconUrl: 'img/green_ping.png',
    iconSize: iconSize, 
    iconAnchor: iconAnchor 
});

// 공격 들어올 때 사용되는 아이콘
var alertIcon = L.icon({
    iconUrl: 'img/red_ping.png',
    iconSize: iconSize,
    iconAnchor: iconAnchor
});

//===============================================================//
//맵 생성

var map = L.map('map').setView(bexco, 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

//마커 생성
var marker = L.marker(bexco, {icon: defaultIcon}).addTo(map);


//===============================================================//
//시각화 차트 변수

var line_chart;
var doughnut_chart;
//===============================================================//
// map과 chart 폴링 변수

var chartUpdateInterval;
var mapUpdateInterval; 

//===============================================================//

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
    if (!line_chart) {
        showLineChart();
    }
    if (!doughnut_chart){
        showdoughnutChart();
    }
    startChartUpdate(); // 차트 실시간 업데이트 시작
});

document.getElementById('closeBtn').onclick = function () {
    // 사이드바를 숨김
    document.getElementById('sidebar').style.display = 'none';
    clearInterval(chartUpdateInterval); // 차트 업데이트 중지
};

function showLineChart() {
    var ctx = document.getElementById('line_chart').getContext('2d');

    line_chart = new Chart(ctx, {
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

function showdoughnutChart(){
    var ctx = document.getElementById('doughnut_chart').getContext('2d');
    var data = {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [0, 0, 0],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
        hoverOffset: 4,
        }]
    };
    
    doughnut_chart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: false,  // 반응형 비활성화
            maintainAspectRatio: false, // 종횡비 유지 비활성화

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
    line_chart.data.datasets[0].data = newData; // 데이터셋의 데이터를 새로운 데이터로 교체
    line_chart.update(); // 차트를 업데이트하여 변경 사항 반영

    var doughnutNewData = genRandData();
    doughnut_chart.data.datasets[0].data=doughnutNewData;
    doughnut_chart.update();
}

// 초기화 시 지도 업데이트 시작
startMapUpdate();




/* =================임시 데이터 (시각화 차트 실시간 변경 확인용)==============*/


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

function genRandData(){
    return [
        Math.floor(Math.random() * 25),
        Math.floor(Math.random() * 25),
        Math.floor(Math.random() * 25)
    ]
}

