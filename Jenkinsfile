pipeline {
  agent any

  environment {
    FRONTEND_IP = "3.110.85.222"
    BACKEND_IP  = "13.232.124.41"
    DB_IP       = "43.205.243.57"
    MYSQL_USER  = "root"
    MYSQL_PASS  = "Anji@10" // Consider using Jenkins credentials plugin
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
            ssh -o StrictHostKeyChecking=no ubuntu@$FRONTEND_IP "sudo mv /tmp/index.html /var/www/html/index.html && sudo systemctl restart nginx"
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

          echo "DB_HOST=$DB_IP" > .env
          echo "DB_USER=$MYSQL_USER" >> .env
          echo "DB_PASS=$MYSQL_PASS" >> .env
          echo "DB_NAME=appdb" >> .env

          npm install
          nohup node app.js > backend.log 2>&1 &
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
            ssh -o StrictHostKeyChecking=no ubuntu@$DB_IP "
              sudo mysql -u $MYSQL_USER -p$MYSQL_PASS < /tmp/init.sql
            "
          '''
        }
      }
    }
  }
}







