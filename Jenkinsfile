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
                    sh 'docker build -t 501697547576.dkr.ecr.us-east-2.amazonaws.com/caketrack:client .'
                }
                dir('Events') {
                    sh 'docker build -t 501697547576.dkr.ecr.us-east-2.amazonaws.com/caketrack:events .'
                }
                dir('Scrape') {
                    sh 'docker build -t 501697547576.dkr.ecr.us-east-2.amazonaws.com/caketrack:scrape .'
                }
                dir('Upload') {
                    sh 'docker build -t 501697547576.dkr.ecr.us-east-2.amazonaws.com/caketrack:upload .'
                }
                dir('User') {
                    sh 'docker build -t 501697547576.dkr.ecr.us-east-2.amazonaws.com/caketrack:user .'
                }
            }
        }

        stage('Push Images to ECR') {
            steps {
                script {
                    sh 'aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 501697547576.dkr.ecr.us-east-2.amazonaws.com'
                    sh 'docker push 501697547576.dkr.ecr.us-east-2.amazonaws.com/caketrack:client'
                    sh 'docker push 501697547576.dkr.ecr.us-east-2.amazonaws.com/caketrack:events'
                    sh 'docker push 501697547576.dkr.ecr.us-east-2.amazonaws.com/caketrack:scrape'
                    sh 'docker push 501697547576.dkr.ecr.us-east-2.amazonaws.com/caketrack:upload'
                    sh 'docker push 501697547576.dkr.ecr.us-east-2.amazonaws.com/caketrack:user'
                }
            }
        }

        stage('Deploy to EKS') {
            steps {
                script {

withKubeConfig(
                credentialsId: 'kubeconfig',  // Jenkins credentials ID for kubeconfig
                serverUrl: 'https://4C18F94466BAA5CB0A9DEC874A2123D6.sk1.us-east-2.eks.amazonaws.com',
                clusterName: 'demo-eks.us-east-2.eksctl.io',
                contextName: 'i-08b607060ae4f81c0@demo-eks.us-east-2.eksctl.io',
                
            ) {
                // Your Kubernetes deployment, pod creation, or other Kubernetes operations here
                sh "kubectl apply -f deployment.yaml"
                sh "kubectl rollout restart deployment client-build-deployment"
            }
                }
            }
        }
    }
}