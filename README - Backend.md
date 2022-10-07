# README





## 개발 환경

- OS 

  - Window 10

  

- Backend

  - Java 17

  - JDK 17.0.3

  - Spring boot 2.7.3 

  - gradle-7.5(빌드 관리)

  - jpa 2.7.3



- DB

  - Maria DB 10.6.8

  

- Infra

  - AWS(ec2)

  - Docker 20.10.18





## ERD

![image-20221006114947030](C:\Users\pyorogrammer\AppData\Roaming\Typora\typora-user-images\image-20221006114947030.png)



## Dependency

- spring-boot-starter-data-jpa 2.7.3
  - spring boot ORM 활성화
- spring-boot-starter-web 2.7.3
  - REST API 
- spring-boot-starter-validation 2.7.3
  - 데이터 유효성 설정/검사
- spring-boot-starter-security 2.7.3
  - 보안 관련 설정
- spring-boot-starter-oauth2-client 2.7.3
  - 소셜 로그인
- jjwt
  - JWT Token 생성 및 검증
- springdoc-openapi
  - swagger
    - API 문서화 자동
- mapstruct
  - Object mapping 수행
- lombok
  - 자주 사용하는 코드 어노테이션 처리로 편의성 향상
- spotless
  - 코드 포맷 통일







## 패키지 구조

![image-20221006155547297](C:\Users\pyorogrammer\AppData\Roaming\Typora\typora-user-images\image-20221006155547297.png)

- Controller
  - Client로부터 받은 요청을 HTTP Method에 맞게 Serivce로 요청 전달
  - Service로부터 받은 응답 ResponseEntity 형태 Client로 응답 전달 
- Service
  - 비즈니스 로직 정의
  - Controller로부터 받은 요청 처리
  - DTO <=> Entity 간 변환 Mapper로 요청
  - Repository로 Entity 형태의 데이터 전달
  - 변환된 응답 DTO를 Controller로 전달
- Mapper
  - Serivce로 부터 받은 요청의 데이터 형태 변환 실행(DTO <=> Entity)
- Entity
  - DB에 쓰일 컬럼과 Entity들간의 연관 관계 정의
  - Resository, DB로 데이터 전달 위한 객체
- DTO
  - Repository를 제외한 계층간 데이터 교환을 위한 객체
- Repository
  - Entity 데이터 DB에 저장
  - DB로 부터 받은 데이터 Entity 형태로 전달



## DoF 디자인 패턴

- 싱글톤(Singleton) 패턴

  - 객체의 인스턴스가 오직 1개만 생성되는 패턴

    - 최초 한번만 메모리 할당(static). 그 후 그 메모리에 인스턴스를 만들어 사용

    - 각 계층에서 다른 계층들을 선언할 때 @RequiredArgsConstructor 어노테이션으로 생성자 주입 진행  + final로 선언



- 빌더(Builder) 패턴

  - 

  

## JPA



영속화 등 어려운 개념 추가하기



## ENUM





