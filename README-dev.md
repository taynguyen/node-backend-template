# api

### Set up
```
make init
make install
make db-migrate
make start
```

### Local development
#### Https 
 - Install caddy
 ```
 brew install caddy
 ```

 - Custom DNS by Edit you /etc/hosts file. Add the following line
 ```
 127.0.0.1 api.athena.local app.athena.local
 ```

  - Run caddy. (First run could require admin permissions to install the certificate)
```
make https-dev
```
