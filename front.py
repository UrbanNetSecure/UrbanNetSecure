import streamlit as st
import folium
from streamlit_folium import st_folium
import time

# 부산 벡스코 좌표 설정 (안맞음)
bexco_location = [35.1683, 129.1310]

# 여백을 제거하는 CSS 추가 (따로 빼기)
st.markdown(
    """
    <style>
    .block-container {
        padding: 0;
        margin: 0;
    }
    .main {
        padding: 0;
        margin: 0;
    }
    /* Streamlit 헤더와 메뉴 숨기기 */
    header {visibility: hidden;}
    /* 선택적으로 footer 숨기기 */
    .streamlit-footer {display: none;}
    </style>
    """,
    unsafe_allow_html=True
)

# 지도 생성
m = folium.Map(
    location=bexco_location, 
    zoom_start=15, 
    tiles='OpenStreetMap'
)

# 마커의 색상 설정
marker_color = 'blue'
marker_red_color = 'red'


# 마커 추가
folium.Marker(
    location=bexco_location,
    popup="BEXCO",
    icon=folium.Icon(icon="info-sign", color=marker_color, prefix='fa')
).add_to(m)

# 지도 출력
st_data = st_folium(m, width=700, height=500)

if st_data['last_clicked']:
    st.write("마커 찍힘")
#     folium.Marker(
#     location=bexco_location,
#     popup="BEXCO",
#     icon=folium.Icon(icon="info-sign", color=marker_red_color, prefix='fa')).add_to(m)

cnt = 0
st.write(f"cnt = {cnt}")


test= st.button("버튼")
if (test) :
    st.write("버튼 눌림")

while True:
    time.sleep(1)
    cnt+=1
    st.rerun()
