let chartUpdateInterval=false;
let line_chart=false;
let doughnut_chart=false;
let pie_chart=false;


let defaultLineData = [0, 0, 0, 0, 0, 0, 0];
let defaultMalLineData = [0, 0, 0, 0, 0, 0, 0];
let defaultDoughnutData = [1,1,1,1];
let defaultPieData = [1,1];

let updateLineData =[0, 0, 0, 0, 0, 0, 0] ;
let updateMalLineData = [0, 0, 0, 0, 0, 0, 0];
let updateDoughnutData = [1,1,1,1];
let updatePieData = [1,1];

const chart_socket = io('http://localhost:3001/api/control', {
    transports: ['websocket']
  });

chart_socket.on('connect', () => {
    console.log('connected!');
    chart_socket.emit('$logData', { serialNo: 'F234c1' });

});
chart_socket.on('%logData', (data) => {
    console.log("return log data");
    console.log(data.graph)
    UpdateChartData(data);
    // console.log(data);
    // console.log(data.graph[0].nonAttackCnt)
});

//============================================================



function UpdateChartData(data){
    //Line Data
    for (i=0; i <= updateLineData.length; i++){
        updateLineData[i] = data.graph[i].nonAttackCnt;
        updateMalLineData[i] = data.graph[i].attackCnt;
    }
    console.log('line comple')
    //Doughnut Data
    for (i=0; i<= updateDoughnutData.length; i++){
        updateDoughnutData[i] = data.donut[i].count;
    }
    console.log('doughnut comple')
    //Pie Data
    updatePieData[0] = data.frequency.attackPercentage;
    updatePieData[1] = data.frequency.nonAttackPercentage;
    console.log('pie comple')
}


let deviceData = {
    bexco : {
        lineData : updateLineData,
        pieData : updatePieData,
        doughnutData : updateDoughnutData,
        malLineData : updateMalLineData

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
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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