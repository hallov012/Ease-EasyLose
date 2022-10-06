---
last modified on: 2022-10-06
---
# Hadoop
- 도커화하였기 때문에 동일한 시스템에서 사용하고 싶다면 도커 이미지를 pull 받으면 됨
    - image: kdw324400/my_hadoop:2.0

## File structure
```
|-- develop
    |-- DATA_ANALYSIS            // data crawling, data parsing
    |-- DOCS                     // hadoop echosystem research
    |-- HADOOP_DOCKERIZE         // dockerrize hadoop img
    |-- HBASE                    // hbase install, setting
    |-- HBASE_MAPREDUCE_CONNECT  // mapreduce using hbase
    |-- HBASE_SPRING_CONNECT     // connect hbase and spring
    |-- MAPREDUCE                // mapreduce using csv file as input
```

## Data
- [식품영양성분DB](https://various.foodsafetykorea.go.kr/nutrient/)의 식품영양DB 데이터
    - 총 90608 row, 22 column
    - 탄수화물, 단백질, 지방의 alias를 제거하여 사용
        - 탄수화물 1000, 단백질 100, 지방 400 넘는 데이터는 삭제
        - 수기로 기입한 데이터로 보이며 이에 따라 오타로 인한 alias를 발견했기 때문에 데이터의 분포를 파악하여 alias 제거
    - 추천하기 적절한 음식(조리료 등 제외)을 can_recommend true로 설정
        - group name을 바탕으로 결정
<p align='center'>
    <img src="/develop/DATA_ANALYSIS/식품영양성분DB(new)/result/식품영양DB_nutrition_range_total_scatter.png" alt="data distribution">
</p>

## 추천 알고리즘
### HBase food_recommend table
- key: 탄,단,지
    - 모두 소숫점 한자리까지 표기가 되어 있음
        - 음식 중 소숫점까지 표기되는 음식 고려
    - 탄수화물은 50g 단위로 자름
        - 예: 40g 든 음식은 0.0, 60g든 음식은 50.0 구간임
    - 단백질, 지방은 5g
    - 예: 음식이 탄단지 60, 40, 13 이면 50.0,40.0,10.0이 key임
    - 띄어쓰기 없고 `,` 로만 구분
    - 형식: string
- value: 음식 index(Food Table 기준 id인 값)을 ,로 이음
    - 예를 들어 50.0,40.0,10.0 구간에 속하는 음식 1, 1000, 9408번이 있다면 1,1000,9408 형식
    - 띄어쓰기 없고 , 로만 구분
    - 형식: string

### BE에서 데이터 활용 방안
- 그 날 부족한 영양소를 계산함
- 계산한 걸 탄단지 50,5,5 단위로 구간을 잘라 알맞은 key를 찾음
- 해당 key에 저장되어 있는 음식 id를 읽어옴
- 음식 id중 can_recommend가 true인 음식만 추천

## HBase
- HBase의 nutrition_DB에 들어있는 데이터를 mapreduce의 input으로 사용
- mapreduce의 output은 food_recommend에 저장
- 자세한 사항은 각 dir의 readme 참고

### setting
- 테이블 생성
```
hbase > create 'nutrition_DB', 'nutrition'
hbase > create 'food_recommend', 'foods_num'
```

- `food_nutrition_DB_without_alias.csv`를 `~/data`로 옮기기
- 기본 shell(hbase shell 아님!!)에서 `$HBASE_HOME/bin/hbase org.apache.hadoop.hbase.mapreduce.ImportTsv -Dimporttsv.separator="," -Dimporttsv.columns="HBASE_ROW_KEY,nutrition:carbon,nutrition:protein,nutrition:fat" nutrition_DB ~/data/food_nutrition_DB_without_alias.csv` 입력
    - csv 파일을 hbase nutrition_DB에 넣는 작업
- `./src/FoodperNutiritionHBase.java` 를 `~/Project/src`로 옮기기
- `./src/Driver.java` 또한 옮김
- `build.xml` 파일은 `~/Project/`에 옮기기
- `~/Project`에서 `ant` 입력하여 컴파일
- HBase, Hadoop이 실행되어 있어야 하는 상태
    - start-all.sh, $HBASE_HOME/bin/start-hbase.sh 순서로 실행
- `~/Project`에서 `hadoop jar ease.jar foodpernutrition` 입력하여 hadoop mapreduce 실행

