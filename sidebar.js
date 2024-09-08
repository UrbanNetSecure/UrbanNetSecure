function onMarkerClick(markerKey) {
    document.getElementById('sidebar').style.display='block';

    var device_name = document.getElementById("device_name");
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
    //차트 데이터 업데이트
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