import pool from '../database';

class UsersController{
    public async ListUsers (){
        const sql=`CALL listUsers()`;
        try {
            const [rows] = await pool.query(sql);
            const usersList = Object.values(JSON.parse(JSON.stringify(rows)));
            return usersList[0];
        } catch (err) {
            console.error(err);
            throw new Error('Error al listar los usuarios');
        }
    }
    
    public async getUser (id: number){
        const sql=`CALL getUser(?)`;
        try {
            const [rows] = await pool.query(sql, [id]);
            const user = Object.values(JSON.parse(JSON.stringify(rows)));
            return user[0];
        } catch (err) {
            console.error(err);
            throw new Error('Error al obtener el usuario');
        }
    }

    public async create (user_login: string, user_pwd: string){
        const sql=`CALL createUser(?, ?)`;
        await pool.query(sql, [user_login,user_pwd]);
    }

    public async update (user_id:number, user_login: string, user_pwd: string){
        const sql=`CALL updateUser(?, ?, ?)`;
        await pool.query(sql, [user_id,user_login,user_pwd]);
    }

    public async changeState (id:number, state: number){
        const sql=`CALL changeStateUser(?, ?)`;
        await pool.query(sql, [id,state]);
    }

}

const usersController = new UsersController();
export default usersController;