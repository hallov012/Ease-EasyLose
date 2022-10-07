---
last modified on: 2022-10-06
---

![Ease logo](/assets/ease_logo_with_border.png)

# Ease
> Easy Lose

`SSAFY 특화 프로젝트 A704`  

## 🎥 서비스 소개 영상
[![Ease를 소개합니다](https://img.youtube.com/vi/xj-3bDGLxIg/0.jpg)](https://youtu.be/xj-3bDGLxIg) 


## 🥗 초보자를 위한 식단 기록 & 관리 서비스
  
🧾 연령대, 성별, 운동량, 식단의 목표를 바탕으로 한 `영양소 비율 추천`(해리스 베네딕트 계산법)  
🥑 초보자를 위한 `기본 식단` 제공  
📝 `모의 식단` 짜보기 & 피드백 받기 기능을 통한 쉬운 식단 구성  
📊 매일, 끼니마다 섭취한 `영양성분 분석`  
🍌 데일리 분석을 바탕으로 한 `음식 추천`  
🍽 식단 불러오기, 최근 먹은 음식 리스트, 바코드 등 `편리한 음식 입력`  
📆 한달 간 성공 여부를 한 눈에 보여주는 `캘린더` 기능으로 동기 부여  

## File structure
`master`
```
|-- assets    // logo, architecture img
|-- backend   
|-- docs      // presentation file
|-- exec      // porting manual, DB dump
|-- frontend  
|-- hadoop    
|-- nginx     
```

## Total Architecture
![total architecture](/assets/%ED%8A%B9%ED%99%94pjt_%ED%86%A0%ED%83%88%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98.png)

## Tech Stacks
- 도커를 이용하여 서버를 배포했으므로 porting manual에 따라 서버에 배포하면 된다.

### Environment
- OS: Windows 10
- IDE
    - VS Code
    - Eclipse
- DB: MariaDB
- Server: AWS EC2
- Docker
### BE
- Java 17
- Spring Boot 2.7.3
- Gradle
- Swagger
    - OpenAPI 3
    - springdoc-openapi v1.6.11
### FE
- React 18.2.0
- Redux 8.0.4
- react-router 5.3.3
### Hadoop
- Hadoop 3.2.2
- HBase 2.4.14
- Zookeeper 3.7.1
- javac 1.8.0_342
- 
## Data
- [식품영양성분DB](https://various.foodsafetykorea.go.kr/nutrient/)의 식품영양DB 데이터
    - 총 90608 row, 22 column
    - 탄수화물, 단백질, 지방의 alias를 제거하여 사용

## Communication Tools
- JIRA
- Mattermost
- Gitlab
- [Notion](https://pastoral-maraca-134.notion.site/fed4bc6aed4a4a50984359636f666af2)
    - 더 많은 정보를 위해 노션을 방문해보세요
## Members
|이름|이메일|역할|
|:--:|:--|:--:|
|김동원|kdw324400@gmail.com|Hadoop, HBase, Data 정제|
|김지인|skygazer227@gmail.com|BE, Infra|
|윤경식|didnlie@gmail.com|FE, UCC|
|정재훈|jaeung644@gmail.com|Hadoop, HBase|
|조혜림|rrimm012@gmail.com|FE, Design|
|홍인표|thedeny11@gmail.com|BE|