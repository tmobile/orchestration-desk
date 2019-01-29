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

var config = {
    'environmentPath' : 'app/env',
    'orchestrationServiceUrl' : 'https://marathon.internal.com/',
    'userNameOrchestrationApi' : 'foobarUsername',
    'passwordOrchestrationApi' : 'foobarPassoword',
    'adminUserName' : 'admin',
    'adminPasswordName' : 'password',
    'serviceHttpProtocol' : 'https',
    'serviceIPMessageFormat' : 'Service:\t%s\t\t\t=\t\t%s:%s',
    'refreshConfigMessageFormat' : 'Refreshing ...\t%s\t\t%s\t\t:\t%s',
    'errorRefreshConfigMessageFormat' : 'Error refreshing ...\t%s\t\t%s\t\t:\t%s',
    'errorServiceConnectionMessageFormat' : 'Error connecting service:\t%s\t\t:\t%s',
    'servicesToRefresh' : [{
            'orchestrationApplicationPath': 'service-1',
            'serviceConfigPath': '/v1/foo/bar/refresh'
        },
        {
            'orchestrationApplicationPath': 'service-2',
            'serviceConfigPath': '/v1/foo/bar/refresh'
        },
        {
            'orchestrationApplicationPath' : 'service-3',
            'serviceConfigPath': '/v1/foo/bar/refresh'
        }
    ]
}

module.exports = config;