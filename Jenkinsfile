          pipeline {
             agent none
            stages {
            stage('Build Docker Image') {
             	agent {
             	    dockerfile true
             	}
             	steps {
             	    echo 'Building Docker Image'
             	}

             }
              stage('Create DEV') {
                when {
                  expression {
                    openshift.withCluster() {
                      openshift.withProject(env.DEV_PROJECT) {
                        return !openshift.selector('dc', 'frontend').exists()
                      }
                    }
                  }
                }
                steps {
                  script {
                    openshift.withCluster() {
                      openshift.withProject(env.DEV_PROJECT) {
                        def app = openshift.newApp("frontend:latest")
                        app.narrow("svc").expose();

                        openshift.set("probe dc/frontend --readiness --get-url=http://:8080 --initial-delay-seconds=30 --failure-threshold=10 --period-seconds=10")
                        openshift.set("probe dc/frontend --liveness  --get-url=http://:8080 --initial-delay-seconds=180 --failure-threshold=10 --period-seconds=10")

                        def dc = openshift.selector("dc", "frontend")
                        while (dc.object().spec.replicas != dc.object().status.availableReplicas) {
                            sleep 10
                        }
                        openshift.set("triggers", "dc/frontend", "--manual")
                      }
                    }
                  }
                }
              }
              stage('Deploy DEV') {
                steps {
                  script {
                    openshift.withCluster() {
                      openshift.withProject(env.DEV_PROJECT) {
                        openshift.selector("dc", "frontend").rollout().latest();
                      }
                    }
                  }
                }
              }
            }
          }