FROM maven:3.6.3-openjdk-18

EXPOSE 80


ADD target/*.jar /app/app.jar


RUN cd /app

WORKDIR /app

ENTRYPOINT ["java", "-jar", "./app.jar", "--server.port=80", "--spring.profiles.active=prod"]
