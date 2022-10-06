# Gradle 설치 & 프로젝트 생성

## Gradle 설치

- https://thecodinglog.github.io/gradle/2019/09/11/install-gradle-in-windows.html

## Gradle 프로젝트 생성

- https://chinsun9.github.io/2020/10/05/gradle/

## Gradle - Lib 폴더 합치기

- Gradle 최신버전(7.x)에서 프로젝트 생성 시 다음과 같이 lib 폴더와 같이 생성된다.

![image](https://user-images.githubusercontent.com/99601412/192806052-5802b6f3-5060-44cd-a099-5b95a4996630.png)

- 본인은 참고자료들이 모두 다음과 같은 dir 구조로 되어 있지 않아, 두 dir를 합쳐주려고 합니다.

### setting.gradle 설정

- setting.gradle에서 `include('lib')`를 삭제후 저장한다.

### dir 모두 삭제

1. 만들어준 프로젝트 dir을 모두 삭제해준다.
2. 본인은 `Hbase-Spring`이랑 `lib`모두 삭제
3. 삭제할 때 주의점은 다음 이미지에서 아무것도 체크하지 말고 그냥 `OK` 눌러준다.
   ![image](https://user-images.githubusercontent.com/99601412/192807505-5485e0c8-bee9-4dc2-a4f8-1546b742be4f.png)

## Eclipse-workspace 설정

1. 프로젝트 생성 시 Eclipse-workspace에 생성된 경로에 들어간다.
2. 본인은 `User > User명 > eclipse-workspace > Hbase-Spring`에 들어간다.
3. `lib` 폴더 안에 있는 내용 중 `.project`와 `.settings`를 제외하고 복사 후 lib 외부에 붙여넣어준다.
4. 붙여넣으면 lib 폴더 삭제한다.

## 프로젝트 Import

1. File > Import > Gradle > Existing Gradle Project
2. Project root directory에서 아까 설정해주었단 workspace 경로로 설정해준다.
   - `elipse-workspace\Hbase-Spring`
3. 다른 설정은 프로젝트 생성시와 동일하다.

# 외부 라이브러리 추가

1. 구글링을 통해 설치하고자 하는 라이브러리를 검색한다.
2. build.gradle에 dependencies 안에 추가 후 저장
   ex)
   ![image](https://user-images.githubusercontent.com/99601412/193048916-296c46a4-7c22-4544-bbbf-ea451c4e0cfe.png)

   ```
    implementation 'com.google.guava:guava:31.0.1-jre'
    implementation 'org.apache.hadoop:hadoop-client:2.7.7'
    //implementation 'org.apache.hbase:hbase-client:3.0.0-alpha-3'
    //implementation 'org.apache.hbase:hbase-shaded-client:3.0.0-alpha-3'
    implementation 'org.apache.hbase:hbase-shaded-client:1.1.2'
   ```

3. 프로젝트 우클릭 > Gradle > Refresh Gradle Project
4. 하단 우측에 설치 진행도를 기다리기!

# 라이브러리가 포함된(Runnable jar) jar로 만들기

- 다음 코드를 build.gradle에 포함시키고 빌드하기.

```java
jar {
	manifest{
      // 'Main-Class':'패키지명':'Class명'
		attributes 'Main-Class':'Another.ConnectSpring'
	}
	from {
        configurations.runtimeClasspath.collect {
            it.isDirectory() ? it : zipTree(it)
        }
    }
    duplicatesStrategy = DuplicatesStrategy.EXCLUDE
	//enabled = false
}
```
