---
author: Dongwon Kim
date: 2022-09-16
---
# 식품영양DB(new)

- 식품영양DB(new)_분석.ipynb로 진행

## 데이터 상태

- 총 22열
    
    영양정보가 NUTR_CONT1 형식으로 되어 있어 아래와 같이 한국어로 치환(API 명세서 참고함)
    
    ```python
    nutrition_name_dict=dict()
    nutrition_name_dict['NUM'] = '번호'
    nutrition_name_dict['FOOD_CD'] = '식품코드'
    nutrition_name_dict['SAMPLING_REGION_NAME'] = '지역명'
    nutrition_name_dict['SAMPLING_MONTH_NAME'] = '채취월'
    nutrition_name_dict['SAMPLING_REGION_CD'] = '지역코드'
    nutrition_name_dict['SAMPLING_MONTH_CD'] = '채취월코드'
    nutrition_name_dict['GROUP_NAME'] = '식품군'
    nutrition_name_dict['DESC_KOR'] = '식품이름'
    nutrition_name_dict['RESEARCH_YEAR'] = '조사년도'
    nutrition_name_dict['SAMPLING_REGION_NAME'] = '지역명'
    nutrition_name_dict['MAKER_NAME'] = '제조사명'
    nutrition_name_dict['SUB_REF_NAME'] = '자료출처'
    nutrition_name_dict['SERVING_SIZE'] = '총내용량'
    nutrition_name_dict['NUTR_CONT1'] = '열량(kcal)(1회제공량당)'
    nutrition_name_dict['NUTR_CONT2'] = '탄수화물(g)(1회제공량당)'
    nutrition_name_dict['NUTR_CONT3'] = '단백질(g)(1회제공량당)'
    nutrition_name_dict['NUTR_CONT4'] = '지방(g)(1회제공량당)'
    nutrition_name_dict['NUTR_CONT5'] = '당류(g)(1회제공량당)'
    nutrition_name_dict['NUTR_CONT6'] = '나트륨(mg)(1회제공량당)'
    nutrition_name_dict['NUTR_CONT7'] = '콜레스테롤(mg)(1회제공량당)'
    nutrition_name_dict['NUTR_CONT8'] = '포화지방산(g)(1회제공량당)'
    nutrition_name_dict['NUTR_CONT9'] = '트랜스지방(g)(1회제공량당)'
    ```
    
- 총 90608 행
    ```

    'NUTR_CONT8': 87988
    'NUTR_CONT9': 79903
    'NUTR_CONT4': 81868
    'NUTR_CONT5': 88510
    'NUTR_CONT6': 87653
    'NUM': 90608
    'NUTR_CONT7': 79127
    'NUTR_CONT1': 89684
    'NUTR_CONT2': 81433
    'SUB_REF_NAME': 90608
    'NUTR_CONT3': 88624
    'RESEARCH_YEAR': 90608
    'MAKER_NAME': 85289
    'GROUP_NAME': 82904
    'SERVING_SIZE': 90608
    'SAMPLING_REGION_NAME': 90608
    'SAMPLING_MONTH_CD': 90608
    'SAMPLING_MONTH_NAME': 90608
    'DESC_KOR': 90608
    'SAMPLING_REGION_CD': 90608
    'FOOD_CD': 90608
    ```
- 가장 작은 열: 79127개인 콜레스테롤
- NaN이 없는 열: 번호, 자료 출처, 조사년도, `총내용량`, 지역명, 채취월코드, 채취월, `식품이름`, 지역코드, 식품코드

![식품영양DB_row_count.png](./result/%EC%8B%9D%ED%92%88%EC%98%81%EC%96%91DB_row_count.png)