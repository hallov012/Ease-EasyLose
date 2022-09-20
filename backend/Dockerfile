FROM openjdk:17-jdk-alpine
USER root
COPY . /code
WORKDIR /code
RUN chmod +x ./gradlew
RUN ./gradlew build -x test
