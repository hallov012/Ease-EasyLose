# 하둡 세팅

### 하둡 실행

```java
start-all.sh
```

## 입력 데이터 세팅

- 파일명 : food_nutrition_DB_without_alias.csv

```java
hdfs dfs -mkdir nutrient_test
// hdfs dfs -put [파일경로/파일명] nutrient_test
hdfs dfs -put data/food_nutrition_DB_for_mapred.csv nutrient_test
```

## MapReduce 함수 세팅

- 파일명 : FoodperNutrition.java
- [Driver.java](http://Driver.java) 가 있는 경로와 동일한 위치에 Mapreduce 함수 파일을 저장합니다.

```java
cd .. // build.xml이 있는 경로로 가기 위해
ant // build.xml을 실행
```

## MapReduce 함수 실행

```java
// 최대탄 최대단 최대지 탄수화물 단백질 지방 순
hadoop jar ssafy.jar nutrition 20000 20000 20000 10 5 5 nutrient_test nutrient_test_out
```

## 결과를 Local에 옮기기

```java
hdfs dfs -get -f /user/hadoop/nutrient_test_out ~
```

- 생성된 part-r-00000 & part-r-00001를 확인해보자!

![image](https://user-images.githubusercontent.com/99601412/190973591-ea2a7619-ca69-4d0f-9f6f-50a5c2642436.png)

- key로 `탄단지` , value로 `index`로 분류된것임을 확인할 수 있다.
