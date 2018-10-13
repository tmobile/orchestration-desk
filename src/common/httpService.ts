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

// tslint:disable-next-line:no-var-keyword
// tslint:disable-next-line:no-var-requires
const request = require('request').defaults({ rejectUnauthorized: false });
import { Promise } from 'es6-promise';
import { URL } from 'url';

export class HttpService {
  private startingHttpStatusErrorCode: number = 300;

  public get(url: URL, headers: {}): Promise<string> {
    return new Promise<any>((resolve: any, reject: any) => {
      request.get({ url: url.toString(), headers }, (error: any, response: any, body: any) => {
        if (error) {
          reject(error.code);
        } else if (response.statusCode < this.startingHttpStatusErrorCode) {
          resolve(body);
        } else {
          reject(response.body);
        }
      });
    });
  }

  public post(url: URL, headers: {}): Promise<string> {
    return new Promise<any>((resolve: any, reject: any) => {
      const options = {
        headers,
        method: 'POST',
        url: url.toString(),
      };

      request(options, (error: any, response: any, body: any) => {
        if (error) {
          reject(error.code);
        } else if (response.statusCode < this.startingHttpStatusErrorCode) {
          resolve(body);
        } else {
          reject(response.body);
        }
      });
    });
  }
}
