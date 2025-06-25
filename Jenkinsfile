pipeline {
  agent any

  environment {
    FRONTEND_IP = "3.6.175.203"
    BACKEND_IP  = "3.6.96.235"
    DB_IP       = "13.200.157.185"
    MYSQL_USER  = "root"                 
    MYSQL_PASS  = "yourpassword"         // Replace this with Jenkins credentials ID for better security
  }

  stages {
    stage('Clone Repository') {
      steps {
        git 'https://github.com/Anjankumar12/3-tier-app.git'
      }
    }

    stage('Deploy Frontend') {
      steps {
        sshagent(['Anjankey']) {
          sh '''
            echo "Deploying frontend to $FRONTEND_IP"
            scp -o StrictHostKeyChecking=no frontend/index.html ubuntu@$FRONTEND_IP:/tmp/
            ssh -o StrictHostKeyChecking=no ubuntu@$FRONTEND_IP "sudo mv /tmp/index.html /var/www/html/index.html"
          '''
        }
      }
    }

    stage('Deploy Backend') {
      steps {
        sshagent(['Anjankey']) {
          sh '''
            echo "Deploying backend to $BACKEND_IP"
            scp -o StrictHostKeyChecking=no -r backend ubuntu@$BACKEND_IP:/home/ubuntu/
            ssh -o StrictHostKeyChecking=no ubuntu@$BACKEND_IP <<EOF
              pkill -f node || true
              cd /home/ubuntu/backend
              cp .env.example .env
              npm install
              nohup npm start > backend.log 2>&1 &
            EOF
          '''
        }
      }
    }

    stage('Initialize Database') {
      steps {
        sshagent(['Anjankey']) {
          sh '''
            echo "Initializing database on $DB_IP"
            scp -o StrictHostKeyChecking=no database/init.sql ubuntu@$DB_IP:/tmp/
            ssh -o StrictHostKeyChecking=no ubuntu@$DB_IP "mysql -h 127.0.0.1 -u $MYSQL_USER -p$MYSQL_PASS < /tmp/init.sql"
          '''
        }
      }
    }
  }
}





