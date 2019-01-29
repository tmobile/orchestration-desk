/*
Copyright 2018 T-Mobile, USA
 
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
 
    http://www.apache.org/licenses/LICENSE-2.0
 
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 
See the License for the specific language governing permissions and
limitations under the License.
 
See the README.md file for additional language around disclaimer of warranties.
*/

import { IConfiguration } from "../configuration.interface";
import { IConfigurationAdapter } from "./configurationAdapter.interface";

import fs from 'fs';

export class ConfigurationAdapter implements IConfigurationAdapter {
    public loadConfiguration(): IConfiguration {

        if (process.argv.length !== 3) {
            throw new Error('Bad Command.. Correct Use: node index.js <absoluteFilePathToConfigurationFile>');
        }

        const absoluteConfigFilePath = process.argv[2];

        if (!fs.existsSync(absoluteConfigFilePath)) {
            throw new Error(absoluteConfigFilePath + ' does not exists');
        }

        return require(absoluteConfigFilePath);
    }
}