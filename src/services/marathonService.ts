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

import { Promise } from 'es6-promise';
import { URL } from 'url';
import { HttpService } from '../common/httpService';
import { identityService } from '../common/identityService';
import { IIPAddress } from '../models/ipAddress/ipAddress.interface';
import { IMarathonTask } from '../models/MarathonTask';
import { IMarathonTasks } from '../models/marathonTask.interface';

export class MarathonService {
  constructor(private httpService: HttpService = new HttpService()) {}

  public getAllIPs(marathonUrl: string, applicationId: string): Promise<IIPAddress[]> {
    const apiUrl: URL = new URL('/v2/apps/' + applicationId + '/tasks', marathonUrl);
    const authToken: string = 'Basic ' + identityService.getEncodedAuthorizationToken();
    const headers = {
      Authorization: authToken,
    };

    return new Promise<IIPAddress[]>((createResolve: any, createReject: any) => {
      this.httpService
        .get(apiUrl, headers)
        .then((response: string) => {
          this.createResponse(JSON.parse(response))
            .then((result: IIPAddress[]) => createResolve(result))
            .catch((result: any) => createReject(result));
        })
        .catch((result: any) => createReject(result));
    });
  }

  private createResponse(marathonTasks: IMarathonTasks): Promise<IIPAddress[]> {
    return new Promise<IIPAddress[]>((createResolve: any, createReject: any) => {
      try {
        const ipAddresses: IIPAddress[] = new Array<IIPAddress>();

        marathonTasks.tasks.forEach((marathonTask: IMarathonTask) => {
          const ipAddress: IIPAddress = {
            IP: marathonTask.host,
            Port: marathonTask.ports[0],
          };
          ipAddresses.push(ipAddress);
        });

        createResolve(ipAddresses);
      } catch (e) {
        createReject(e);
      }
    });
  }
}
