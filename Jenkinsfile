pipeline {
  agent any

  environment {
    FRONTEND_IP = "3.6.175.203"
    BACKEND_IP  = "3.6.96.235"
    DB_IP       = "13.200.157.185"
  }

  stages {
    stage('Clone Repo') {
      steps {
        git 'https://github.com/Anjankumar12/3-tier-app.git'
      }
    }

    stage('Deploy Frontend') {
      steps {
        sshagent(['Anjankey']) {
          sh '''
            scp -o StrictHostKeyChecking=no frontend/index.html ubuntu@$FRONTEND_IP:/tmp/
            ssh -o StrictHostKeyChecking=no ubuntu@$FRONTEND_IP "sudo mv /tmp/index.html /usr/share/nginx/html/index.html"
          '''
        }
      }
    }

    stage('Deploy Backend') {
      steps {
        sshagent(['Anjankey']) {
          sh '''
            scp -o StrictHostKeyChecking=no -r backend ubuntu@$BACKEND_IP:/home/ubuntu/
            ssh -o StrictHostKeyChecking=no ubuntu@$BACKEND_IP "
              pkill -f 'node app.js' || true &&
              cd /home/ubuntu/backend &&
              cp .env.example .env &&
              npm install &&
              nohup npm start &
            "
          '''
        }
      }
    }

    stage('Init Database') {
      steps {
        sshagent(['Anjankey']) {
          sh '''
            scp -o StrictHostKeyChecking=no database/init.sql ubuntu@$DB_IP:/tmp/
            ssh -o StrictHostKeyChecking=no ubuntu@$DB_IP 'mysql -h 127.0.0.1 -u jenkins -pyourpassword < /tmp/init.sql'
          '''
        }
      }
    }
  }
}



