function onMarkerClick(markerKey) {
    document.getElementById('sidebar').style.display='block';

    var device_name = document.getElementById("device_name");
    device_name.textContent=markerKey;

    if (!line_chart) {
        showLineChart();
    }
    if (!doughnut_chart) {
        showdoughnutChart();
    }

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