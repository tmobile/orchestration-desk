#!/usr/bin/env bash

#/*
#Copyright 2018 T-Mobile, USA
 
#Licensed under the Apache License, Version 2.0 (the "License");
#you may not use this file except in compliance with the License.
#You may obtain a copy of the License at
 
#    http://www.apache.org/licenses/LICENSE-2.0
 
#Unless required by applicable law or agreed to in writing, software
#distributed under the License is distributed on an "AS IS" BASIS,
#WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 
#See the License for the specific language governing permissions and
#limitations under the License.
 
#See the README.md file for additional language around disclaimer of warranties.
#*/

# function to run the application for given environment
run() {

    echo 'For' $1 'environment';
    cat ./config/config.$1.js | sed -- $regexUsername | sed -- $regexPassword > ./dist/toggle-refresher/config.js
    cd ./dist/toggle-refresher
    echo 'node index.js' $(pwd)'/config.js'
    node index.js $(pwd)/config.js
    rm -f ./config.js || true
    cd ..
}

# create username and password replacement regex
regexUsername='s/foobarUsername/'$MARATHON_USERNAME'/g'
regexPassword='s/foobarPassoword/'$MARATHON_PASSWORD'/g'

echo 'node --version'
node --version

echo "cd orchestration-desk"
cd orchestration-desk

echo 'yarn install'
yarn install

echo "cd toggle-refresher"
cd ../toggle-refresher

echo 'yarn install'
yarn install

# replace the strings
echo 'Profile: ' $PROFILE
run $PROFILE;