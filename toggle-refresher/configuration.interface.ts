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

export interface IConfiguration {
    environmentPath: string;
    orchestrationServiceUrl: string;
    userNameOrchestrationApi: string;
    passwordOrchestrationApi: string;
    adminUserName: string;
    adminPasswordName: string;
    serviceHttpProtocol: string;
    serviceIPMessageFormat: string;
    refreshConfigMessageFormat: string;
    errorRefreshConfigMessageFormat: string;
    errorServiceConnectionMessageFormat: string;
    servicesToRefresh: IOrchestrationToServiceMapping[];
}

export interface IOrchestrationToServiceMapping {
    orchestrationApplicationPath: string;
    serviceConfigPath: string;
}