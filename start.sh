#!/bin/bash

# Install frontend modules and build
echo "[+] Building frontend application..."
cd frontend/ && npm i && ./node_modules/.bin/ng build --prod
echo "[+]Done"
sleep 1
# Build and run backend
echo "[+] Building backend application..."
cd ../backend/ &&\
docker-compose up
