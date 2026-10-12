pipeline {
    agent any

    environment {
        IMAGE_NAME = 'lightdarkapp'
        CONTAINER_NAME = "lightdarkapp-${BUILD_NUMBER}"
    }

    stages {
        stage('Verify') {
            steps {
                sh 'mvn -B clean verify'
            }
        }

        stage('Build image') {
            steps {
                sh 'docker build --pull -t "$IMAGE_NAME:$BUILD_NUMBER" .'
            }
        }

        stage('Smoke test') {
            steps {
                sh '''
                    set -eu
                    docker run -d --name "$CONTAINER_NAME" -p 18080:8080 "$IMAGE_NAME:$BUILD_NUMBER"
                    trap 'docker rm -f "$CONTAINER_NAME" >/dev/null 2>&1 || true' EXIT
                    for attempt in $(seq 1 30); do
                        if curl --fail --silent http://127.0.0.1:18080/api/health; then
                            curl --fail --silent http://127.0.0.1:18080/ | grep -q 'Choose your'
                            exit 0
                        fi
                        sleep 2
                    done
                    docker logs "$CONTAINER_NAME"
                    exit 1
                '''
            }
        }
    }

    post {
        always {
            sh 'docker rm -f "$CONTAINER_NAME" >/dev/null 2>&1 || true'
        }
    }
}
