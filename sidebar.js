let currentMarkerKey = null;
let dataTableInitialized = false;

function onMarkerClick(markerKey) {
    document.getElementById('sidebar').style.display='block';
    currentMarkerKey = markerKey;

    showChart(markerKey);
    
    if (!sidebar_socket){
        sidebar_socket = io("http://localhost:3001/api/control", {
            transports: ['websocket']
        });
        
    }
    
}

function showChart(markerKey){
    let device_name = document.getElementById("device_name");
    device_name.textContent=markerKey;

    // 차트 초기화
    if (chartUpdateInterval) {
        clearInterval(chartUpdateInterval);
        chartUpdateInterval = null;
    }

    if (line_chart) {
        line_chart.destroy();
        line_chart = null;
    }

    if (doughnut_chart) {
        doughnut_chart.destroy();
        doughnut_chart = null;
    }

    if(pie_chart){
        pie_chart.destroy();
        pie_chart= null;
    }

    //차트 실행
    showLineChart(markerKey);
    showdoughnutChart(markerKey);
    showPieChart(markerKey);


    startChartUpdate(markerKey);
}

bexcoMarker.on('click', function () {
    this.setIcon(defaultIcon);
    
    onMarkerClick('bexco');
});

test1Marker.on('click', function () {
    this.setIcon(defaultIcon);

    onMarkerClick('test1');
});

test2Marker.on('click', function () {
    this.setIcon(defaultIcon);
    
    onMarkerClick('test2');
});

//=======================================================================

document.getElementById('tab1').addEventListener('click', function () {
    switchTab('tab1', 'tab-content1');
    showChart(currentMarkerKey);
});

document.getElementById('tab2').addEventListener('click', function () {
    switchTab('tab2', 'tab-content2');
    var table = new Tabulator("#example-table", {
        height:"580px",
        layout:"fitColumns",
        pagination:'local',
        paginationSize: 20,
        autoResize: true,
        columns:[
            {title:"Date", field:"date"},
            {title:"Serial Number", field:"serial"},
            {title:"Status", field:"status", sorter:"number"}, 
            {title:"Type", field: "type", sorter:"string"}
        
        ],
        data: [
            { date: "1989-02-25", serial: "AB-32-DA-CF-AE-FF", status: 1, type:"DOS"},
            { date: "1989-03-17", serial: "AB-32-DA-CF-AE-FF", status: 0, type:"Brute Force" },
            { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type:"DDOS" },
            { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type:"DDOS" },
            { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 0, type:"DDOS" },
            { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type:"DDOS" },
            { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type:"DDOS" },
            { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 0, type:"DDOS" },
            { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 0, type:"DDOS" },
            { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 0, type:"DDOS" },
            { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type:"DDOS" },
            { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type:"DDOS" },
            { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type:"DDOS" },
            { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type:"DDOS" },
            { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type:"DDOS" },
            { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type:"DDOS" },
            { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 0, type:"DDOS" },
            { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 0, type:"DDOS" },
            { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 0, type:"DDOS" },
            { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type:"DDOS" },
            { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type:"DDOS" },
            { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type:"DDOS" },
            { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 0, type:"DDOS" },
            { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 0, type:"DDOS" },
            { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 0, type:"DDOS" },
            { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type:"DDOS" },
            { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type:"DDOS" },
            { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 0, type:"DDOS" },
            { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type:"DDOS" },
            { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type:"DDOS" },
            { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type:"DDOS" },
            { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type:"DDOS" },
            { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type:"DDOS" },
            { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 0, type:"DDOS" },
            { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type:"DDOS" },
        ],
        rowFormatter: function(row) {
            var data = row.getData();
        
            // status에 따라 배경색을 밝게 조정
            if (data.status === 1) {
                row.getElement().style.backgroundColor = "#ffcccc"; // status가 1이면 밝은 빨간색
                row.getElement().style.color = "#990000";
                row.getElement().style.fontWeight = "bold";
            } else if (data.status === 0) {
                row.getElement().style.backgroundColor = "#f0f0f0"; // status가 0이면 밝은 회색
                row.getElement().style.color = "#333333"; // 어두운 텍스트
            }
        }
    });


});

// 기본으로 시각화 탭 선택
document.getElementById('tab1').classList.add('active');
document.getElementById('tab-content1').classList.add('active');

function switchTab(tabId, contentId) {
    // 모든 탭을 비활성화
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // 선택된 탭과 내용 활성화
    document.getElementById(tabId).classList.add('active');
    document.getElementById(contentId).classList.add('active');
}

//=======================================================================

