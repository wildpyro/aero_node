# Areopoincs Lab 
## Runs a grow tent using embedded nodejs on a **raspberry pi**

## Installation  
* clone the repo
* run `npm run start` for full deployment
* run `npm run test` to execute tests
* run `npm run build` to build/compile source files

## Dependencies 
* Uses onoff package for interacting with the gpio

## Dev Dependencies
* Uses typescript 2.4 and above for string enums  
* angular-cli 1.0 and above for UI scaffolding
* tests are through mocha and chai  

## Configuration
under config you can change the db and server setup.  

### db_config
---
    username: 
    password: 
    dialect: sqlite
    database: absolute path to database file
    storage: absolute path to database file (required for sqllite)
    host:  ip of storage location (127.0.0.1)
    port: port to communicate on (3306)
    logging: whether you want to see logging in the console. Turn off for production (true|false)
    force: will drop the table before trying a sync. Turn off for production (true|false)
    timezone: +00:00
---    

### server_config
---
    port: port for express to launch on (3000)
    session: 
        secret: aero_node
        name: same of the app for session management
        resave: (true|false)
        saveUninitialized: (true|false)
        proxy: (true|false)
---