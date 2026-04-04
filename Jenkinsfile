pipeline {
    agent any

    environment { 
        DOCKERHUB_USERNAME = 'piyushthaware07'
        GIT_REPO = 'https://github.com/PiyushThaware07/project-todos' 
        GIT_BRANCH = 'main-production'
        IMAGE_TAG = "latest"
        SONAR_HOST_URL = 'https://sonarcloud.io/'
    }

    stages {

        stage('Clone') {
            steps { 
                echo 'Cloning Repository' 
                git branch: "${GIT_BRANCH}", url: "${GIT_REPO}"
            }
        }

        stage('Build Images') {
            steps {
                echo 'Building images using Dockerfiles'
                sh """
                docker build -t ${DOCKERHUB_USERNAME}/todo-client:${IMAGE_TAG} ./todo-client
                docker build -t ${DOCKERHUB_USERNAME}/todo-server:${IMAGE_TAG} ./todo-server
                """
            }
        }

        stage('Login DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh """
                    echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin
                    """
                }
            }
        }

        stage('Push Images') {
            steps {
                sh """ 
                docker push ${DOCKERHUB_USERNAME}/todo-client:${IMAGE_TAG}
                docker push ${DOCKERHUB_USERNAME}/todo-server:${IMAGE_TAG}
                """
            }
        }

        stage('Deploy Application') {
            steps {
                echo 'Deploying application using Docker Compose'
                sh """
                docker-compose -f docker-compose.yml pull
                docker-compose -f docker-compose.yml down || true
                docker-compose -f docker-compose.yml up -d
                """
            }
        }
    }

    post { 
        always { 
            sh 'docker system prune -f' 
        } 
    }
}