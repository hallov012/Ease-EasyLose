# Ease FE README

## Wirefram

[Figma 주소](https://www.figma.com/file/obQZZIW01ZKQMaWTnZHP26/Ease(%ED%8A%B9%ED%99%94%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8)?node-id=0%3A1)

****

<br />

<br />

## StartPage

![ease_startpage](/uploads/cb33dd6c09b7e98bfa8bb8dba7cda72f/ease_startpage.gif)

* 카카오, 구글, 네이버 세 가지 소셜 로그인 제공 

<br />

<br />

## SignupPage

![ease_signuppage](/uploads/f665507dfcb384a514b060f75a75b38a/ease_signuppage.gif)

* 성별, 나이, 키, 몸무게, 활동량, 목표 입력 후 헤리스 베네딕트 방정식을 이용해 하루 권장 칼로리 계산
* 나이, 성별, 키, 몸무게: MUI Slider 사용

<br />

<br />

## MainPage

![ease_mainpage_](/uploads/0167a218f0cd893408ce79f140c36a93/ease_mainpage_.gif)

> 차트는 ApexChart를 이용해 구현

### DailyDietPage

* 유저가 입력한 당일 식단의 목표 달성률을 한눈에 볼 수 있는 페이지
* 상단에는 목표치 대비 현재 섭취량을 시각화
  * 상단 카드를 클릭하면 DailySummary로 이동
* 하단은 끼니별 카드에는 목표 칼로리 대비 해당 끼니 섭취량을 시각화
  * 카드 클릭 시 MealSummary로 이동

<br />

### DailySummary

* 당일 섭취한 전체 영양소를 한눈에 볼 수 있는 페이지
* 내 정보
  * 수정 버튼 클릭 시 유저 정보 변경 페이지로 이동
* 섭취 영양소 비율
  * 당일 섭취한 식사 목록의 탄수화물, 단백질, 지방 비율을 파이 차트로 시각화
* 목표 달성률
  * 목표 섭취량 대비 현재 섭취량을 막대그래프로 시각화
* 영양비율
  * 당일 섭취량을 나타내는 그래프
  * 목표치를 차트에 표현하여 달성률을 파악할 수 있도록 구현

<br />

### MealSummary

* 해당 끼니에 섭취한 영양소를 파악하고 식사 목록을 추가하는 페이지
* 식사 목록
  * 유저가 입력한 음식 리스트 출력
  * "?" 버튼 클릭 시 해당 음식의 상세 영양 정보 페이지로 이동
  * 휴지통 버튼 클릭시 리스트에서 삭제
* 섭취 영양소 비율
  * 해당 끼니에 섭취한 식사 목록의 탄수화물, 단백질, 지방 비율을 파이 차트로 시각화
* 영양비율
  * 해당 끼니 섭취량을 나타내는 그래프
  * 목표치를 차트에 표현하여 달성률을 파악할 수 있도록 구현

<br />

<br />

## PlanPage

![ease_planpage](/uploads/ff4a70ae236772bafbee2c4bdd5b99e5/ease_planpage.gif)

> MainPage와 페이지 구성이 거의 같기 때문에 색상으로 페이지 간의 차이를 줌

### PlanMainPage

* 새로운 식단 목록을 생성, 삭제할 수 있는 페이지
* 리스트의 "?" 버튼 클릭 시 해당 식단의 총 열량, 탄수화물, 단백질, 지방 정보 출력
* 휴지통 버튼 클릭시 리스트에서 삭제

<br />

### PlanDetail

* MainPage/DailyDietPage와 동일 템플릿 

<br />

### PlanSummary

* MainPage/DailySummary와 동일 템플릿

<br />

### PlanMealSummary

* MainPage/MealSummary와 동일 템플릿 

<br />

<br />

## AddPage

### 검색, History를 이용한 음식 추가

![ease_addpage_search](/uploads/9eb634b504d515d7d0269083ae09dd3e/ease_addpage_search.gif)

* 

<br />

### 바코드 인식을 통한 음식 추가

![ease_addpage_barcode](/uploads/f8839429174de54c664d9010e406f641/ease_addpage_barcode.gif)

* 

<br />

### 저장된 식단을 통한 음식 추가

![ease_addpage_plan](/uploads/13ce4fee03f8c2a581e034812b689b39/ease_addpage_plan.gif) 

* 

<br />

### 유저 항목 생성

![ease_addpage_custom](/uploads/1e7b8432fbcbc9ac94fe7b418cba965e/ease_addpage_custom.gif)

<br />

<br />

## CalendarPage

![ease_calendarpage](/uploads/f364da17fcfd6bffaf558e26344a2e16/ease_calendarpage.gif)

* 

<br />

<br />

## ChartPage

![ease_charpage](/uploads/275d47ebafe6fc297465295de5d70ea7/ease_charpage.gif)

* 섭취량 변화
  * 조회 기준 날짜 이전 7일의 유저가 섭취한 영양소 정보를 출력 (조회 날짜는 상단의 Navbar로 변경 가능)
* 몸무게 변화
  * 유저의 몸무게 변화 로그 출력

<br />

<br />

## MyPage

![ease_mypage](/uploads/e2781e025699735ac019f1d09d527e9b/ease_mypage.gif)

> ModNut 이외는 SignupPage의 화면과 동일하므로 생략

### ModNut

* 칼로리와 탄수화물, 단백질, 지방 비율로 목표 영양수치 변경 가능

****

<br />

<br />

## FE Members

### 🥑 윤경식

>소감

<br />

### 🍒 조혜림

> 유저 편의성을 생각해 디자인을 하고 차트를 구현하는 일들이 힘들었다
>
> 모바일 기준의 웹 사이트를 처음 만들어보는지라 화면 크기 조율 등에 애를 많이 먹어, 다음에 모바일 웹을 만들 때는 정보를 더 찾아보고 해야 할 것 같다는 생각이 들었다...
>
> React를 처음 쓰는 거라 우여곡절이 많았는데, 친절한 팀원에게 도움을 많이 받았다
>
> 시간이 많았다면 더 다듬어진 결과물을 낼 수 있었을 것 같은데 SSAFY 프로젝트 특성상 시간이 여유롭게 주어지지 않아 아쉬운 부분들이 있다, 다음 프로젝트는 더욱 분발해 더 발전한 결과물을 낼 수 있으면 좋겠다 :)
