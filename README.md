---
author: Dongwon Kim
last_modified_on: 2022-08-29
---
# 1일차
## 이론
- scale out, scale up
    - scale out: low-end 대량, 값싼 서버 사용
    - scale up: high-end 소량, 값비싼 서버 사용
    - 데이터 중심에서는 값싼 서버 사용하는 걸 선호
    - 성능이 선형적으로 증가하는 것이 아니기 때문에 비용 대비 효율 측면에서 `scale-out` 이 유리  

- Map Reduce Framework
    - 한대 컴퓨터로 처리 힘듦으로 여러 대 묶어서 처리 가능
    - 낮은 레벨 몰라도 가능
    - 클러스터를 만들고 scalable 한 병렬 소프트웨어 구현 쉽게 함
    - hadoop으로 map reduce 프레임워크 사용 가능
    - map, reduce 함수가 주요로 사용됨  

- Map reduce programming model
    - 함수형
    - record는 항상 (key,val) 쌍으로 나타남
    - main을 마스터 머신에서 수행
        - map 전 전처리, reduce의 결과 처리
    - map은 
        - key가 동일한 record는 동일한 machine에 배정 받음
        - 입력: (key, val)
        - 출력: [(key, val)]
    - reduce 
        - shuffling의 (key, [val]) 마다 1개의 reduce 함수 호출됨
        - 입력: (key, [val])
        - 출력: [(key, val)]
    - combine
        - map 함수 return 크기가 줄어듦, 각 머신에서 reduce 사용한 것처럼 수행됨
        - shuffle 비용 줄어듦, network traffic 줄어듦
    
    - map reduce phase에서는 map → (combine) → reduce 순서로,
    - `map → shuffling → reduce` phase 반복적으로 수행됨
        - 여러 파티션으로 나눠진 걸 병렬로 수행됨
        - mapper가 map 함수 실행
        - key를 이용해 sort한 후 value-list로 만들고 key, value-list로 만들어 분산함
        - key, value-list 하나 당 reduce 한 번 호출  
    - master 역할인 namenode, slave 역할인 datanodes로 구성됨
        - namenode: 파일 시스템 과닐, 클라이언트가 파일에 접근하게 함
        - datanode: 컴퓨터에 들어있는 데이터에 접근하게 함  

- Hadoop
    - map reduce: 수행을 분산
    - 분산 파일 시스템(HDFS)
        - 여러 곳에 저장함, 백업도 함(fault tolerance 위해)
        - 데이터 분산
    - java를 이용해서 map reduce 알고리즘 구현
 
## 실습

- virtual box에서 진행
    - hadoop이라는 사용자 만들고 superuser 권한 부여
    - 교안을 따라 hadoop 설치
- 새로운 맵리듀스 코드 컴파일 하는 법
    - 소스 코드를 Project/src/에 넣기
    - Project/src/Driver.java에 pgd.addClass(”program name”, class name, “description”); 을 넣기
    - Project/ 에서 ant로 컴파일
- 클래스와 자바 타입이 따로 정의되어 있음
- 사용자 정의도 가능

- [Wordcount1char.java](./src/Wordcount1char.java)
- [Driver.java](./src/Driver.java)

