var chartUpdateInterval = null;
var line_chart = null;
var doughnut_chart = null;
var pie_chart = null;

var defaultLineData = [0, 1, 0, 5, 0, 3, 2];
var defaultMalLineData = [1, 5, 2, 6, 5, 8, 3];
var defaultDoughnutData = [1, 2, 3];
var testLineData = [10,20,30,40,50,60,70];


var deviceData = {
    bexco : {
        lineData : defaultLineData,
        doughnutData : defaultDoughnutData,
        malLineData : defaultMalLineData
    },
    test1 : {
        lineData : testLineData,
        doughnutData : defaultDoughnutData,
        malLineData : defaultMalLineData
    },
    test2 : {
        lineData : defaultLineData,
        doughnutData : defaultDoughnutData,
        malLineData : defaultMalLineData
    }
}

function showdoughnutChart(markerKey){
    var ctx = document.getElementById('doughnut_chart').getContext('2d');

    var data = {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
            label: 'data',
            data: deviceData[markerKey].doughnutData,
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
            responsive: false,
            maintainAspectRatio: false, 

        }
    });
}

function showPieChart(markerKey) {
    var ctx = document.getElementById('pie_chart').getContext('2d');

    var data = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
            label: 'Pie Chart Data',
            data: deviceData[markerKey].doughnutData, // 도넛 차트와 동일한 데이터를 사용
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

    pie_chart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: false,
            maintainAspectRatio: false
        }
    });
}

function showLineChart(markerKey) {
    var ctx = document.getElementById('line_chart').getContext('2d');

    var data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Data',
                data: deviceData[markerKey].lineData,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'Data2',
                data: deviceData[markerKey].malLineData,
                borderWidth: 1

            }]
    }

    line_chart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            animation: {
                duration: 1000, 
                easing: 'easeInOutQuad' 
            },
        }
    });
}

// 1초마다 데이터 업데이트
function startChartUpdate(markerKey) {
    chartUpdateInterval = setInterval(function () {
        updateChartData(markerKey);
    }, 1000); 
}

function updateChartData(markerKey) {
    var newLineData = generateRandomData(); 
    var newMalLineData = generateRandomData(); 
    deviceData[markerKey].lineData = newLineData; 
    deviceData[markerKey].malLineData = newMalLineData; 

    line_chart.data.datasets[0].data = deviceData[markerKey].lineData; 
    line_chart.data.datasets[1].data = deviceData[markerKey].malLineData; 
    line_chart.update();

    var newDoughnutData = genRandData(); 
    deviceData[markerKey].doughnutData = newDoughnutData; 
    
    doughnut_chart.data.datasets[0].data = deviceData[markerKey].doughnutData;
    doughnut_chart.update(); 
}

// close 버튼 클릭 이벤트
document.getElementById('closeBtn').onclick = function () {
    document.getElementById('sidebar').style.display = 'none';
    clearInterval(chartUpdateInterval); 
};

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

function genRandData() {
    return [
        Math.floor(Math.random() * 25),
        Math.floor(Math.random() * 25),
        Math.floor(Math.random() * 25)
    ]
}