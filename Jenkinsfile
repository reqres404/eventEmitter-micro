pipeline {
    agent any

    environment {
        registry = "501697547576.dkr.ecr.us-east-1.amazonaws.com/caketrack"       
    }

    stages {
        stage('checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Images') {
            steps {
                dir('client') {
                    sh 'docker build -t 501697547576.dkr.ecr.us-east-1.amazonaws.com/caketrack:client .'
                }
                dir('Events') {
                    sh 'docker build -t 501697547576.dkr.ecr.us-east-1.amazonaws.com/caketrack:events .'
                }
                dir('Scrape') {
                    sh 'docker build -t 501697547576.dkr.ecr.us-east-1.amazonaws.com/caketrack:scrape .'
                }
                dir('Upload') {
                    sh 'docker build -t 501697547576.dkr.ecr.us-east-1.amazonaws.com/caketrack:upload .'
                }
                dir('User') {
                    sh 'docker build -t 501697547576.dkr.ecr.us-east-1.amazonaws.com/caketrack:user .'
                }
            }
        }

        stage('Push Images to ECR') {
            steps {
                script {
                    sh 'aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 501697547576.dkr.ecr.us-east-1.amazonaws.com'
                    sh 'docker push 501697547576.dkr.ecr.us-east-1.amazonaws.com/caketrack:client'
                    sh 'docker push 501697547576.dkr.ecr.us-east-1.amazonaws.com/caketrack:events'
                    sh 'docker push 501697547576.dkr.ecr.us-east-1.amazonaws.com/caketrack:scrape'
                    sh 'docker push 501697547576.dkr.ecr.us-east-1.amazonaws.com/caketrack:upload'
                    sh 'docker push 501697547576.dkr.ecr.us-east-1.amazonaws.com/caketrack:user'
                }
            }
        }

        stage('Deploy to EKS') {
            steps {
                script {

                    withKubeConfig(caCertificate: '', clusterName: '', contextName: '', credentialsId: 'kubeconfig', namespace: '', restrictKubeConfigAccess: false, serverUrl: '') {
                    // some block
                    }

                    // Apply Kubernetes manifests
                    sh "kubectl apply -f deployment.yaml --context caketrack-eks" 
					sh "kubectl rollout restart deployment client-build-deployment"
                }
            }
        }
    }
}