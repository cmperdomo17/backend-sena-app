import mysql from 'mysql2/promise';
import keys from './keys';

const pool = mysql.createPool(keys.database);

(async () => {
    try {
        const connection = await pool.getConnection(); 
        connection.release(); 
        console.log('DB is connected');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1); 
    }
})();

export default pool;