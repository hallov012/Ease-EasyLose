FROM openjdk:17-jdk-alpine
USER root
COPY . /code
WORKDIR /code
RUN chmod +x ./gradlew
RUN ./gradlew bootJar
RUN cp ./build/libs/*SNAPSHOT.jar ./app.jar
