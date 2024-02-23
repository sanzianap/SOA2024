FROM openjdk:17-jdk-alpine
ARG JAR_FILE=trget/*.jar
COPY ./target/demo-0.0.1-SNAPSHOT.jar demo.jar
ENTRYPOINT ["java", "-jar", "/demo.jar"]