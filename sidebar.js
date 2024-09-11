let currentMarkerKey = undefined;
let dataTableInitialized = false;

const dataSet = {
    data: [
        { date: "1989-02-25", serial: "AB-32-DA-CF-AE-FF", status: 1, type: "DOS" },
        { date: "1989-03-17", serial: "AB-32-DA-CF-AE-FF", status: 0, type: "Brute Force" },
        { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type: "DDOS" },
        { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type: "DDOS" },
        { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 0, type: "DDOS" },
        { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type: "DDOS" },
        { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type: "DDOS" },
        { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 0, type: "DDOS" },
        { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 0, type: "DDOS" },
        { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 0, type: "DDOS" },
        { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type: "DDOS" },
        { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type: "DDOS" },
        { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type: "DDOS" },
        { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type: "DDOS" },
        { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type: "DDOS" },
        { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type: "DDOS" },
        { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 0, type: "DDOS" },
        { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 0, type: "DDOS" },
        { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 0, type: "DDOS" },
        { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type: "DDOS" },
        { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type: "DDOS" },
        { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type: "DDOS" },
        { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 0, type: "DDOS" },
        { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 0, type: "DDOS" },
        { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 0, type: "DDOS" },
        { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type: "DDOS" },
        { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type: "DDOS" },
        { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 0, type: "DDOS" },
        { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type: "DDOS" },
        { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type: "DDOS" },
        { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type: "DDOS" },
        { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type: "DDOS" },
        { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 0, type: "DDOS" },
        { date: "1990-08-12", serial: "AB-32-DA-CF-AE-FF", status: 1, type: "DDOS" },
    ]
}

const rowsPerPage = 10;  // 한 페이지에 표시할 행 수
let currentPage = 1;    // 현재 페이지

function onMarkerClick(markerKey) {
    document.getElementById('sidebar').style.display = 'block';
    currentMarkerKey = markerKey;

    showChart(markerKey);
    
    if (!sidebar_socket){
        sidebar_socket = io("http://localhost:3001/api/control", {
            transports: ['websocket']
        });
        
    }
    
}

function showChart(markerKey) {
    let device_name = document.getElementById("device_name");
    device_name.textContent = markerKey;

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

    if (pie_chart) {
        pie_chart.destroy();
        pie_chart = null;
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

document.getElementById('tab1').classList.add('active');
document.getElementById('tab-content1').classList.add('active');

document.getElementById('tab2').addEventListener('click', function () {
    switchTab('tab2', 'tab-content2');
    renderTable(currentPage);  // 페이지를 클릭할 때 테이블을 렌더링
});

function renderTable(page) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    // 기존 테이블 내용을 지움
    $(".dataFields").empty();

    // 현재 페이지의 데이터 렌더링
    for (let i = start; i < end && i < dataSet.data.length; i++) {
        const row = dataSet.data[i];
        const postItem = `
        <tr style="background-color: ${row.status == 1 ? '#ff3d3d' : 'transparent'}"> 
            <td style="font-weight: ${row.status == 1 ? 'bold; color:#fff' : ''}">${row.date}</td>
            <td style="font-weight: ${row.status == 1 ? 'bold; color:#fff' : ''}">${row.serial}</td>
            <td style="font-weight: ${row.status == 1 ? 'bold; color:#fff' : ''}">${row.status}</td>
            <td style="font-weight: ${row.status == 1 ? 'bold; color:#fff' : ''}">${row.type}</td>
        </tr>
        `;
        $(".dataFields").append(postItem);
    }

    // 페이지네이션 버튼 업데이트
    renderPagination();
}

// 페이지네이션 버튼을 렌더링하는 함수
function renderPagination() {
    const totalPages = Math.ceil(dataSet.data.length / rowsPerPage);
    let paginationHtml = '';

    for (let i = 1; i <= totalPages; i++) {
        paginationHtml += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
    }

    $(".pagination").html(paginationHtml);
}

// 페이지 변경 함수
function changePage(page) {
    currentPage = page;
    renderTable(currentPage);
}

//=======================================================================

document.getElementById('tab3').addEventListener('click', function () {
    switchTab('tab3', 'tab-content3');
    showChart(currentMarkerKey);
});

document.getElementById('tab4').addEventListener('click', function () {
    switchTab('tab4', 'tab-content4');
    showChart(currentMarkerKey);
});

function switchTab(tabId, contentId) {
    // 모든 탭 및 콘텐츠 숨기기
    var tabs = document.getElementsByClassName('tab');
    var contents = document.getElementsByClassName('tab-content');

    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
        contents[i].style.display = 'none';
    }

    // 선택된 탭 및 콘텐츠 표시
    document.getElementById(tabId).classList.add('active');
    document.getElementById(contentId).style.display = 'block';
}
