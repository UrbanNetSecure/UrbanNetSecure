// let map_socket;

let sidebar_socket = io("http://localhost:3001/api/control");
sidebar_socket.on('$logData', (data)=>{
    console.log(data);
})


// function UpdateLineChart(data, markerKey){
//     deviceData[markerKey].lineData = data.graph.map((d) => d.status);
//     deviceData[markerKey].malLineData = data.graph.map((d) => d.status);

//     line_chart.data.datasets[0].data = deviceData[markerKey].lineData;
//     line_chart.data.datasets[1].data = deviceData[markerKey].malLineData;
//     line_chart.update();
// }

// function UpdateDoughnutChart(data, markerKey){
//     deviceData[markerKey].doughnutData = data.donut.Socket.count

//     doughnut_chart.data.datasets[0].data = deviceData[markerKey].doughnutData;
//     doughnut_chart.update();
// }

// function UpdatePieChart(data, markerKey){
//     pie_chart.data.datasets[0].data = deviceData[markerKey].doughnutData;
//     pie_chart.update();
// }



// socket.emit('$log', {
//     content: '로그 내용 예시',
//     attackType: '공격 유형 예시',
//     isAttack: 1,
//     serialNo: '12345'
// });