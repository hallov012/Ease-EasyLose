---
author: Dongwon Kim
date: 2022-09-16
---
# 전국통합식품데이터 분석

- 전국통합식품데이터_분석.ipynb로 진행

## 데이터 상태

- 총 39 열
    ```
    '식품코드', '식품명', '데이터구분코드', '데이터구분명', '에너지(kcal)', '수분(g)', '단백질(g)',
    '지질(g)', '회분(g)', '탄수화물(g)', '당류(g)', '총식이섬유(g)', '칼슘(mg)', '철(mg)',
    '인(mg)', '칼륨(mg)', '나트륨(mg)', '비타민 A(μg RAE)', '레티놀(μg)', '베타카로틴(μg)',
    '티아민(mg)', '리보플라빈(mg)', '니아신(mg)', '비타민 C(mg)', '비타민 D(μg)',
    '콜레스테롤(mg)', '총포화지방산(g)', '트랜스지방산(g)', '폐기율(%)', '출처코드', '출처명',
    '1회섭취참고량', '업체명', '데이터생성방법코드', '데이터생성방법명', '데이터생성일자', '데이터기준일자',
    '제공기관코드', '제공기관명'
    ```
- 총 46186 행
```
`RangeIndex: 46186 entries, 0 to 46185
Data columns (total 39 columns):
 #   Column         Non-Null Count  Dtype  
---  ------         --------------  -----  
 0   식품코드           43941 non-null  object 
 1   식품명            46186 non-null  object 
 2   데이터구분코드        46186 non-null  object 
 3   데이터구분명         46186 non-null  object 
 4   에너지(kcal)      46186 non-null  int64  
 5   수분(g)          3819 non-null   float64
 6   단백질(g)         46186 non-null  float64
 7   지질(g)          46186 non-null  float64
 8   회분(g)          3368 non-null   float64
 9   탄수화물(g)        46186 non-null  float64
 10  당류(g)          45521 non-null  float64
 11  총식이섬유(g)       2880 non-null   float64
 12  칼슘(mg)         3321 non-null   float64
 13  철(mg)          3343 non-null   float64
 14  인(mg)          3353 non-null   float64
 15  칼륨(mg)         2866 non-null   float64
 16  나트륨(mg)        45672 non-null  float64
 17  비타민 A(μg RAE)  2893 non-null   float64
 18  레티놀(μg)        3239 non-null   float64
 19  베타카로틴(μg)      2793 non-null   float64
 20  티아민(mg)        3245 non-null   float64
 21  리보플라빈(mg)      3252 non-null   float64
 22  니아신(mg)        3185 non-null   float64
 23  비타민 C(mg)      3221 non-null   float64
 24  비타민 D(μg)      2053 non-null   float64
 25  콜레스테롤(mg)      44797 non-null  float64
 26  총포화지방산(g)      45269 non-null  float64
 27  트랜스지방산(g)      45131 non-null  float64
 28  폐기율(%)         1577 non-null   float64
 29  출처코드           46186 non-null  int64  
 30  출처명            46186 non-null  object 
 31  1회섭취참고량        28565 non-null  object 
 32  업체명            45389 non-null  object 
 33  데이터생성방법코드      46186 non-null  int64  
 34  데이터생성방법명       46186 non-null  object 
 35  데이터생성일자        46186 non-null  object 
 36  데이터기준일자        46186 non-null  object 
 37  제공기관코드         46186 non-null  int64  
 38  제공기관명          46186 non-null  object 
dtypes: float64(24), int64(4), object(11)
memory usage: 13.7+ MB
```

- 가장 작은 열: 1577개인 폐기율
- NaN이 없는 열: `식품명, 데이터구분코드, 데이커구분명, 에너지, 단백질, 지질, 탄수화물`, 출처명, 데이터생성방법코드, 데이터생성방법명, 데이터생성일자, 데이터기준일자, 제공기간코드, 제공기관명
- NaN이 비교적 적어 프로젝트에 활용할 수 있을 열: 당류, 나트륨, 콜레스테롤, 총포화지방산, 트랜스지방산
    - 최저 개수가 44797(콜레스테롤)
    
    ![전국통합식품데이터_row_count (1).png](./result/%EC%A0%84%EA%B5%AD%ED%86%B5%ED%95%A9%EC%8B%9D%ED%92%88%EB%8D%B0%EC%9D%B4%ED%84%B0_row_count.png)

## 식품 분류 별 구분

- 식품명이 식품카테고리_식품이름의 형식으로 되어 있음
- 그러나 기장_찰기장+이백찰_도정_생것 처럼 예외가 있긴 함
    - 아직 예외 처리 안 함
- 전국통합식품데이터_class_num.csv에 개수가 많은 것 순서대로 내림차순으로 저장함
- 밥류, 빵, 초콜릿, 과채주스, 비스킷류, 일반과자, 액상음료, 케이크 등의 순으로 많음
- 추가적으로 {식품 이름, 카테고리} 형식으로 데이터에 원래 저장되어 있던 순서대로 csv 파일로 저장함(전국통합식품데이터_name_to_category.csv)

## 영양소 분포도 파악

- 식단 추천 시 쓰일 듯한 `에너지, 탄수화물, 단백질, 지방, 당, 나트륨` 에 대해 전체 분포가 어떤지 violin 를 이용하여 나타냄
- 값이 부분적으로 없는 당, 나트륨은 null 값을 0으로 대체하여 표기
    
    ![전국통합식품데이터_nutrition_range_total.png](./result/%EC%A0%84%EA%B5%AD%ED%86%B5%ED%95%A9%EC%8B%9D%ED%92%88%EB%8D%B0%EC%9D%B4%ED%84%B0_nutrition_range_total.png)

- 에너지(kcal)
    - 0 ~ 600 사이에 주로 위치
    - 평균값은 250 정도
    - 60~ 100 정도에 가장 많이 분포하고 위로 올라갈수록 좁아지는 형태
    - 최솟값: 0 최댓값: 1000
- 탄수화물(g)
    - 0 ~ 100 사이에 주로 위치
    - 평균값은 30정도
    - 10 정도에 가장 많이 분포하고 위로 갈수록 좁아지는 형태
    - 최솟값: 0, 최댓값: 190 정도
- 단백질(g)
    - 0 ~ 20 사이 주로 위치
    - 평균값 10정도
    - 평균 근처에 가장 많이 분포, 항아리 형태
    - 최솟값: 0, 최댓값: 100
- 지방(g)
    - 0 ~ 30 사이 주로 위치
    - 평균값은 17정도
    - 0 ~ 평균 사이에 가장 많이 분포
    - 최솟값: 0, 최댓값: 110 정도
- 당(g)
    - 0 ~ 30 사이 주로 위치
    - 평균값은 20정도
    - 0 ~ 평균 사이에 가장 많이 분포
    - 최솟값: 0, 최댓값: 180 정도
- 나트륨(mg)
    - 0 ~ 1000 사이 주로 위치
    - 평균값은 500 정도
    - 위로 갈수록 좁아지는 형태
    - 최솟값: 0, 최댓값: 41000 정도