#!/bin/bash

docker stop $(docker ps -aq) &&\
docker rm $(docker ps -aq) &&\
docker rmi backend_api &&\
sh start.sh
