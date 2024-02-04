FROM eclipse-temurin:17

LABEL mentainer="javaguides.net@gmail.com"

WORKDIR /app

COPY target/demo-0.0.1-SNAPSHOT.jar /app/demo.jar

ENTRYPOINT ["java", "-jar", "demo.jar"]