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

import util from 'util';

import {Promise} from 'es6-promise';
import { URL } from 'url';

import { Logger } from '../adapters/logger';
import { ILogger } from '../adapters/logger.interface';
import { IServiceAdapter } from '../adapters/service-adapter.interface';
import { IConfiguration } from '../configuration.interface';

import { ServiceAdapter } from '../adapters/service-adapter';
import { serviceAdminProvider } from '../identityProviders/serviceAdminProvider';
import { IApplication } from '../refresh.configuration';

import { IPAddressController } from '../../orchestration-desk/src/controllers/ipAddressController';
import { AdapterFactory } from '../../orchestration-desk/src/factory/adapterFactory';
import { ServiceType } from '../../orchestration-desk/src/factory/ServiceType';
import { IIPAddress } from '../../orchestration-desk/src/models/ipAddress/ipAddress.interface';

export class ConfigController {

    constructor(
        private config: IConfiguration,
        private controller: IPAddressController,
        private logger: ILogger = new Logger()
        ) {
    }

    public refreshApplications(applications: IApplication[]): Promise<void> {

        return new Promise<void>((resolve) => {

            applications.forEach((application: IApplication) => {

                this.controller.getIPAddresses(
                    application.applicationId,
                    new AdapterFactory(this.config.userNameOrchestrationApi, this.config.passwordOrchestrationApi, ServiceType.Marathon))
                    .then((response: IIPAddress[]) => {
                        response.forEach((ipAddress: IIPAddress) => {
                            this.logger.info(util.format(this.config.serviceIPMessageFormat, application.applicationId, ipAddress.IP, ipAddress.Port));
                            const url: string = this.config.serviceHttpProtocol + '://' + ipAddress.IP + ':' + ipAddress.Port;
                            this.refresh(application.configPath, url, this.config.adminUserName, this.config.adminPasswordName)
                            .then((refreshResponse : any) => {
                                this.logger.info(util.format(this.config.refreshConfigMessageFormat, application.applicationId, url, refreshResponse));
                                })
                            .catch((error: any) => this.logger.info(util.format(this.config.errorRefreshConfigMessageFormat, application.applicationId, url, error)));
                        });
                    }).catch(
                        (error:any) => this.logger.error(util.format(this.config.errorServiceConnectionMessageFormat, application.applicationId, error))
                    );
            });

        resolve();
        
        });
    }

    public refresh(
        applicationName: string,
        url: string,
        adminUsername: string,
        adminPassword: string): Promise<string> {
            const serviceAdapter: IServiceAdapter = new ServiceAdapter(new URL(url));
            serviceAdminProvider.setUsername(adminUsername);
            serviceAdminProvider.setPassword(adminPassword);
        return serviceAdapter.refreshConfig(applicationName);
    }
}