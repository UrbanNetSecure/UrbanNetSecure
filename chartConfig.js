var chartUpdateInterval;
const defaultLineData = [0, 0, 0, 0, 0, 0, 0];
const defaultDoughnutData = [0, 0, 0];

const deviceData = {
    bexco : {
        lineData : defaultLineData,
        doughnutData : defaultDoughnutData
    },
    test1 : {
        lineData : defaultLineData,
        doughnutData : defaultDoughnutData
    },
    test2 : {
        lineData : defaultLineData,
        doughnutData : defaultDoughnutData
    }
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
            label: 'data',
            data: defaultDoughnutData,
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

function showLineChart() {
    var ctx = document.getElementById('line_chart').getContext('2d');

    var data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Data',
            data: defaultLineData,
            borderColor: 'rgba(75, 192, 192, 1)',
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
            }
        }
    });
}

// 1초마다 데이터 업데이트
function startChartUpdate() {
    chartUpdateInterval = setInterval(function () {
        updateChartData();
    }, 1000); 
}

function updateChartData() {
    var newData = generateRandomData(); 
    line_chart.data.datasets[0].data = newData; 
    line_chart.update(); 

    var doughnutNewData = genRandData();
    doughnut_chart.data.datasets[0].data=doughnutNewData;
    doughnut_chart.update();
}

// close 버튼 클릭 이벤트
document.getElementById('closeBtn').onclick = function () {
    document.getElementById('sidebar').style.display = 'none';
    clearInterval(chartUpdateInterval); 
};