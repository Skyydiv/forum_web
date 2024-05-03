#!/bin/bash

#BDD
xterm -e "sudo killall mongod; sudo mongod -dbpath ./BDD" & 

#server
xterm -e "cd server;npm start" &

#client
xterm -e "cd client;npm run dev" &

