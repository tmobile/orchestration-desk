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

import { IIPAddress } from '../../models/ipAddress/ipAddress.interface';
import { IServicesAddress } from '../../models/ipAddress/servicesAddress.interface';
import { MarathonService } from '../../services/marathonService';
import { IIPAdapter } from './ipAdapter.interface';

export class MarathonIPAdapter implements IIPAdapter {
  public getIPAddressAllServices(): Promise<IServicesAddress[]> {
    throw new Error('Method not implemented.');
  }

  public getAllTasksIPAddress(marathonUrl: string, applicationId: string): Promise<IIPAddress[]> {
    return new MarathonService().getAllIPs(marathonUrl, applicationId);
  }
}
