
### If you want to get ip address and ports of all containers in marathon appilication then use below example.

```
//.... you code to load configurations
const controller: IPAddressController = new IPAddressController(config.marathonUrl, config.userNameMarathonApi, config.passwordMarathonApi);

//.... store applications name you want to get the ipaddress and ports in application array.

applications.forEach((application: IApplication) => {

                this.controller.getIPAddresses(
                    application.applicationId,
                    new AdapterFactory(this.config.userNameOrchestrationApi, this.config.passwordOrchestrationApi, ServiceType.Marathon))
                    .then((response: IIPAddress[]) => {
                        response.forEach((ipAddress: IIPAddress) => {
                            // .. do your stuff with ip and ports
                        });
                    }).catch(
                        // .. handle error
                    );
            });

```

### Toggle Refresher
- Toggle refresher app is an application using orchestration desk to ping refresh endpoints on containers deployed on marathon.

- Visit toggle refresher directory
- yarn install
- cd dist/toggle-refresher
- node index.js <abosolutePathToConfig> e.g. node index.js /pathToToggleRefresher/config.dev.js