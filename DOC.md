
### If you want to get ip address and ports of all containers in marathon appilication then use below example.

```
//.... you code to load configurations
const controller: IPAddressController = new IPAddressController(config.marathonUrl, config.userNameMarathonApi, config.passwordMarathonApi);

//.... store applications name you want to get the ipaddress and ports in application array.

applications.forEach((application: any) => {

    controller.getIPAddresses(application.marathonAppId)
        .then((response: Array<IIPAddress>) => {
            response.forEach((ipAddress: IIPAddress) => {
                console.log(util.format(config.serviceIPMessageFormat, application.marathonAppId, ipAddress.IP, ipAddress.Port));
            });
        }).catch(
            (error:any) => console.error(config.errorServiceConnectionMessageFormat, application.marathonAppId, error)
        );
});

```