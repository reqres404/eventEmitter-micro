pipeline {
    agent any

    environment {
        DB_URL = credentials('DB_URL') 
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
                    sh 'docker build -t 501697547576.dkr.ecr.us-east-1.amazonaws.com/caketrack:server .'
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
                    sh "aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 501697547576.dkr.ecr.us-east-1.amazonaws.com"
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
                    // Retrieve AWS IAM credentials from Jenkins credentials
                    def awsCredentials = credentials('EKS_CREDENTIALS')
                    def awsAccessKeyId = awsCredentials.split(':')[0]
                    def awsSecretAccessKey = awsCredentials.split(':')[1]

                    // Configure kubectl with AWS IAM credentials
                    sh "aws eks update-kubeconfig --region us-east-1 --name demo-eks --role-arn 'arn:aws:iam::501697547576:role/arn:aws:iam::501697547576:role/eksctl-demo-eks-cluster-ServiceRole-1AWGP09YOR6YY' --access-key \${awsAccessKeyId} --secret-key \${awsSecretAccessKey}"

                    // Apply Kubernetes manifests
                    sh "kubectl apply -f deployment.yaml"  // Assuming you have the deployment manifests in a folder called 'kubernetes'
                }
            }
        }
    }
}