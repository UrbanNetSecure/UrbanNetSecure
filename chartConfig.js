let chartUpdateInterval = null;
let line_chart = null;
let doughnut_chart = null;
let pie_chart = null;

let defaultLineData = [0, 0, 0, 0, 0, 0, 0];
let defaultMalLineData = [1, 1, 1, 1, 0, 1, 0];
let defaultDoughnutData = [1, 2, 3];
let defaultPieData = [1,2,3];


let deviceData = {
    bexco : {
        lineData : defaultLineData,
        doughnutData : defaultDoughnutData,
        malLineData : defaultMalLineData
    },
    test1 : {
        lineData : defaultLineData,
        doughnutData : defaultDoughnutData,
        malLineData : defaultMalLineData
    },
    test2 : {
        lineData : defaultLineData,
        doughnutData : defaultDoughnutData,
        malLineData : defaultMalLineData
    }
}

//=======================================================//
function showdoughnutChart(markerKey){
    let ctx = document.getElementById('doughnut_chart').getContext('2d');

    let data = {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
            label: 'data',
            data: deviceData[markerKey].doughnutData,
            backgroundColor: [
                '#FF9999',  // 밝은 빨강
                '#99CCFF',  // 밝은 파랑
                '#FFD700'   // 금색
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
            plugins:{
                title:{
                    display: true,
                    text: 'Attack Type',
                    font: {
                        size: 20,
                    },
                    color: '#333333'
                },
                legend:{
                    display: true,
                    position: 'bottom',
                    color: '#e0e0e0',
                    labels:{
                        color: '#333333'
                    }
                }
            }
        }
    });
}

function showPieChart(markerKey) {
    let ctx = document.getElementById('pie_chart').getContext('2d');

    let data = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
            label: 'Pie Chart Data',
            data: deviceData[markerKey].doughnutData,
            backgroundColor: [
                '#FF9999',  // 밝은 빨강
                '#99CCFF',  // 밝은 파랑
                '#FFD700'   // 금색
            ],
            hoverOffset: 4
        }]
    };

    pie_chart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: false,
            maintainAspectRatio: false,
            plugins:{
                title:{
                    display:true,
                    text:"TMP",
                    font:{
                        size: 20,
                    },
                },
                legend:{
                    display:true,
                    position:"bottom",
                    color: '#e0e0e0',
                    labels:{
                        color: '#333333'
                    }
                }
            }
        }
    });
}

function showLineChart(markerKey) {
    let ctx = document.getElementById('line_chart').getContext('2d');

    let data = {
        labels: ['월', '화', '수', '목', '금', '토', '일'],
        datasets: [
            {
                label: 'Data',
                data: deviceData[markerKey].lineData,
                borderColor: '#FF6347',
                borderWidth: 2
            },
            {
                label: 'Data2',
                data: deviceData[markerKey].malLineData,
                borderColor: '#4682B4',
                borderWidth: 2

            }]
    }

    line_chart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            scales: {
                x: {
                    ticks: {
                        color: '#333333'  
                    },
                    grid: {
                        color: '#cccccc'  
                    }
                },
                y: {
                    ticks: {
                        color: '#333333' 
                    },
                    grid: {
                        color: '#cccccc'  
                    }
                }
            },
            plugins:{
                title:{
                    display: true,
                    text: 'TMP',
                    font: {
                        size: 20,
                    },
                    color: '#333333'
                },
                legend: {
                    display: true,
                    position: 'bottom',
                    labels:{
                        color: '#333333',
                    }
                }
            },
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

    sidebar_socket.emit('$logData',1);
    // let newLineData = generateRandomData(); 
    // let newMalLineData = generateRandomData(); 
    // deviceData[markerKey].lineData = newLineData; 
    // deviceData[markerKey].malLineData = newMalLineData; 

    // line_chart.data.datasets[0].data = deviceData[markerKey].lineData; 
    // line_chart.data.datasets[1].data = deviceData[markerKey].malLineData; 
    // line_chart.update();

    // let newDoughnutData = genRandData(); 
    // deviceData[markerKey].doughnutData = newDoughnutData; 
    
    // doughnut_chart.data.datasets[0].data = deviceData[markerKey].doughnutData;
    // doughnut_chart.update(); 
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

function genRandData() {
    return [
        Math.floor(Math.random() * 25),
        Math.floor(Math.random() * 25),
        Math.floor(Math.random() * 25)
    ]
}