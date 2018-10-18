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

const mockIPAddressData = {
    tasks: [{
        appId: "foo/bar/appId",
        healthCheckResults: [{
            alive: true,
            consecutiveFailures: 0,
            firstSuccess: "2018-07-27T23:15:52.599Z",
            lastFailure: null,
            lastFailureCause: null,
            lastSuccess: "2018-07-28T03:57:58.319Z",
            taskId: "foo_bar_appId.db8e9db5-91f2-11e8-bdca-0648e19f6ef1"
        }],
        host: "10.12.61.245",
        id: "foo/bar/appId-00001",
        ipAddresses: [{
            ipAddress: "172.17.0.3",
            protocol: "IPv4"
        }],
        ports: [13836],
        slaveId: "3a80683c-1c97-47d3-9e0b-c66bec27ba6c-S154",
        stagedAt: "2018-07-27T23:14:48.647Z",
        startedAt: "2018-07-27T23:14:53.198Z",
        state: "TASK_RUNNING",
        version: "2018-07-27T23:14:45.960Z",
    }]
}

export {
    mockIPAddressData
}