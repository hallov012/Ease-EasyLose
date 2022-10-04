FROM openjdk:17-jdk-alpine
COPY . /code
WORKDIR /code
RUN chmod +x ./gradlew
RUN ./gradlew bootJar
RUN cp ./build/libs/*SNAPSHOT.jar ./app.jar
