import { createPool } from 'mysql2/promise';
import keys from './keys';

const pool = createPool(keys.database);

(async () => {
    try {
        const connection = await pool.getConnection(); 
        console.log('DB is connected');
        connection.release(); 
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1); 
    }
})();

export default pool;