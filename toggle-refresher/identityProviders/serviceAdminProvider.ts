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

import { IdentityProvider } from "./identityProviders.interface";

class ServiceAdminProvider implements IdentityProvider {
    
    private username: string = '';
    private password: string = '';

    public getEncodedAuthorizationToken(): string {
        return Buffer.from(this.username + ':' + this.password).toString('base64');
    }

    public setUsername(username: string) {
        this.username = username;
    }

    public setPassword(password: string) {
        this.password = password;
    }
}

const serviceAdminProvider: IdentityProvider = new ServiceAdminProvider()

export { serviceAdminProvider };