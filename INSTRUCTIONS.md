## Setup postgres server and schema

###Install postgres
```brew install postgres
```

###Start postgres
```brew services start postgresql
```

###Access Postgres Shell
```PSQL
```

###Create the database
```CREATE DATABASE user_backendapi;
```

###Create the schema
import file DBSchema\schema.sql into database

###Setup the connect in the config file
adjust the database connection on config.js

## Run the application

###initial setup and run the app
```brew install node@8
npm i
node index.js
```
