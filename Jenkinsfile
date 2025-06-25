pipeline {
  agent any

  environment {
    FRONTEND_IP = "13.127.151.197"
    BACKEND_IP  = "13.235.247.157"
    DB_IP       = "3.111.187.120"
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
            scp frontend/index.html ec2-user@$FRONTEND_IP:/tmp/
            ssh ec2-user@$FRONTEND_IP "sudo mv /tmp/index.html /usr/share/nginx/html/index.html"
          '''
        }
      }
    }

    stage('Deploy Backend') {
      steps {
        sshagent(['Anjankey']) {
          sh '''
            scp -r backend ec2-user@$BACKEND_IP:/home/ec2-user/
            ssh ec2-user@$BACKEND_IP "
              cd /home/ec2-user/backend &&
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
            scp database/init.sql ec2-user@$DB_IP:/tmp/
            ssh ec2-user@$DB_IP "mysql -u root -pyourpassword < /tmp/init.sql"
          '''
        }
      }
    }
  }
}

