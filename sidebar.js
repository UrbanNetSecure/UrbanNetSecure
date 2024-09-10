let currentMarkerKey = null;


function onMarkerClick(markerKey) {
    document.getElementById('sidebar').style.display='block';
    currentMarkerKey = markerKey;

    showChart(markerKey);
    
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