---
author: Dongwon Kim
date: 2022-09-20
---
# HBase에 Mapreduce 결과 파일 넣기

## 데이터 준비
1. VM local(~/data)에 결과 파일(ex. part-r-00000) 옮기기

## import
1. [Hbase settings](README.md)를 참고하여 hbase shell 진입
2. 테이블 생성 
    - `create 'nutrition_DB', 'cf'`
3. 테이블에 csv 값 넣기
    - `$HBASE_HOME/bin/hbase org.apache.hadoop.hbase.mapreduce.ImportTsv -Dimporttsv.separator=":" -Dimporttsv.columns="HBASE_ROW_KEY,cf:food_index" nutrition_DB ~/data/part-r-00000`
    - 결과 값이 `탄,단,지    :food_index0,    food_index1,    `형식으로 되어 있음
    - `:`로 분리하여 키와 index들 저장
4. 랜덤 엑세스
    - 예시: `get 'nutrition_DB', "90.0,85.0,70.0\x09"`
    ```
    COLUMN                         CELL
    cf:food_index                 timestamp=2022-09-19T23:50:54.573, value=86067
    1 row(s)
    Took 0.0070 seconds
    ```
## 진행상황
- alias를 없앤 식품영양DB 데이터의 mapreduce 결과(part-r-00000, part-r-00001)을 모두 'nutrition_DB'에 저장함
![scan result](./result/scan_result.jpg)

- 결과 파일을 parsing하여 저장하려고 생각했으나 key를 묶는 방법에는 그냥 원래 파일이 더 좋아 보여 그대로 진행
    - 시도하려 했던 것
        - 탄:단:지,index0,index1,..... 가 한 줄이 되도록 변경
        - [mapreduce_result_parse.ipynb](mapreduce_result_parse.ipynb) 이용
        - 결과: [part-r-00000_parse.csv](./result/part-r-00000_parse.csv)
## 해야할 일
- 현재 mapreduce의 결과에 `    `가 쉼표 뒤에 붙어있는데 이부분 없애기
- key 끝에 붙어 있는 horizontal tab(0x09) 없애기