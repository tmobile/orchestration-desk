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

import { HttpService } from '../../src/common/httpService';
import { IIPAddress } from '../../src/models/ipAddress/ipAddress.interface';
import { MarathonService } from '../../src/services/marathonService';
import { mockIPAddressData } from '../mock/ipAddresses.mock';

describe('Marathon Service', () => {

    const httpService: HttpService = new HttpService();
    const applicationId: string = 'foo/bar/appId'
    const url: string = 'http://orchestrationDesk.com';
    const service: MarathonService = new MarathonService(httpService);

    describe('getAllIPs', () => {

        it('Gets IP Address for given application Id', () => {
            spyOn(httpService, "get").and.returnValue(
                    new Promise<any>(
                        (resolve: any, reject: any) => {
                            resolve(JSON.stringify(mockIPAddressData));
                            })
                        );

            const expectedIPAddress: IIPAddress = { IP: '172.17.0.3', Port: 13836};
            service.getAllIPs(url, applicationId).then((response: IIPAddress[]) => {
                expect(response.length).toBe(1);
                expect(response[0]).toBe(expectedIPAddress);
            });
        });

        it('Should reject on failed response', () => {
            spyOn(httpService, "get").and.returnValue(
                new Promise<any>(
                    (resolve: any, reject: any) => {
                        reject('Test Error');
                    })
                );

            service.getAllIPs(url, applicationId).catch((error: string) => {
                expect(error).toBe('Test Error');
            });
        });
    });
});