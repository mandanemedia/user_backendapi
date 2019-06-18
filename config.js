'use strict';

module.exports = {
    secret: 'cc_DanialJavanmardi_BackendAPI',
    DBPoolConnection: {
        user: 'djavanmardi', // env var: PGUSER
        database: 'user_backendapi', // env var: PGDATABASE
        password: '', // env var: PGPASSWORD
        host: 'localhost', // Server hosting the postgres database
        port: 5432, // env var: PGPORT
        max: 10, // max number of clients in the pool
        idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
    }
}
