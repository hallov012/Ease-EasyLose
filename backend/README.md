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
  - Spring Boot ORM 활성화
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
    - API 문서 자동 생성
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
  - Spring (Boot) 에서는 Bean이라는 명칭으로 사용됨
  - 최초에 한번만 메모리 할당
  - @Autowired 및 @RequiredArgsConstructor 어노테이션으로 앱의 Bean을 등록하여 사용
  - 일반적으로 final 키워드를 추가하여 생성자 호출 이후 변경이 불가능하도록 함
- 빌더(Builder) 패턴
  - Builder 클래스를 만들고 각각의 멤버변수에 대한 메서드를 생성하는 패턴
  - 초기값 지정이 편리해지고 인스턴스 생성 과정이 단순해짐
  - 생성자의 직접적인 호출을 방지하는 역할

## Spring Data JPA

- DB에 직접적으로 접근하는 것이 아니라 DB를 형상화한 Entity를 통해 접근하여 반복적인 SQL 구문 작성 등을 방지할 수 있음
- JpaRepository를 상속받은 인터페이스에 메서드명만 작성하면 자동으로 그 이름에 맞게 동작하는 메서드를 생성해주기 때문에 편리하게 사용 가능
- JPQL 혹은 Raw query를 작성할 수도 있어서 복잡한 구문도 어느정도 처리 가능
- SQL 구문을 직접 사용하는 것에 비해 퍼포먼스가 낮을 수 있기 때문에 상황에 맞는 방식 선정이 필수적으로 보임
