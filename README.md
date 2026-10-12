# Lightdark

A small Java 21 and Spring Boot app for choosing a light, dark, or system-matched appearance. The preference is saved in the browser, and the preview responds immediately to theme changes.

## Run locally

Requires Java 21 and Maven 3.9+.

```powershell
mvn spring-boot:run
```

Open http://localhost:8080. Run the test suite with `mvn -B verify`; the health endpoint is available at `/api/health`.

## Run with Docker

Requires Docker with BuildKit enabled (the default in current Docker releases).

```powershell
docker build -t lightdarkapp .
docker run --rm -p 8080:8080 lightdarkapp
```

The multi-stage image caches Maven dependencies between builds and runs only on a Java 21 JRE as a non-root user. Its health check calls `/api/health`.

## Jenkins

The `Jenkinsfile` runs Maven verification, builds the Docker image tagged with the Jenkins build number, and starts it for an HTTP smoke test. Configure the Jenkins agent with Java 21, Maven 3.9+, Docker, `curl`, and `grep`; the agent must be able to run containers. Image publishing is intentionally left to your registry credentials and deployment policy.
