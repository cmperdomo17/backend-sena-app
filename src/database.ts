import { createPool } from 'mysql2/promise';
import keys from './keys';

const pool = createPool({
    host: keys.database.host,
    user: keys.database.user,
    password: keys.database.password,
    database: keys.database.database,
    port: keys.database.port,
});

pool
    .getConnection()
    .then((connection) => {
        console.log('DB is connected');
        connection.release(); 
    })
    .catch((err) => {
        console.error('Error connecting to database: ', err);
    });

export default pool;