#!/usr/bin/env node

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

import { IConfiguration, IOrchestrationToServiceMapping } from './configuration.interface';
import { ConfigController } from './controllers/configController';

import { IPAddressController } from '../orchestration-desk/src/controllers/ipAddressController';
import { ConfigurationAdapter } from './config/configurationAdapter';
import { IApplication } from './refresh.configuration';

import { IConfigurationAdapter } from './config/configurationAdapter.interface';

const configAdapter: IConfigurationAdapter = new ConfigurationAdapter();
const config: IConfiguration = configAdapter.loadConfiguration();

const applications: IApplication[] = [];
config.servicesToRefresh.forEach((orchestrationToServiceMapping: IOrchestrationToServiceMapping) => {
    applications.push({ applicationId: config.environmentPath + '/' + orchestrationToServiceMapping.orchestrationApplicationPath, configPath: orchestrationToServiceMapping.serviceConfigPath });
});

const controller: IPAddressController = new IPAddressController(config.orchestrationServiceUrl);
const refreshController: ConfigController = new ConfigController(config, controller);
refreshController.refreshApplications(applications).then();