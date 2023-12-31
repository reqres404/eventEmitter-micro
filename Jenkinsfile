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
// check info in ECR push commands
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
                	// Retrieve AKS credentials
                    // sh "az --version"
                    // sh "az login"
					withKubeConfig(caCertificate: '', clusterName: '', contextName: '', credentialsId: 'kubeconfig', namespace: '', restrictKubeConfigAccess: false, serverUrl: '') {
    				// some block
						}
                	// sh "az aks get-credentials --resource-group Usecase2 --name kubecluster --overwrite-existing"

                	// Apply Kubernetes manifests
					sh "kubectl delete deployment frontend-deployment authservice-deployment admin-deployment event-deployment || true"
                	sh "kubectl apply -f deployment.yaml"
					// sh "kubectl rollout restart deployment frontend-deployment authservice-deployment admin-deployment event-deployment"
            	}
        	}
    	}
    }
}