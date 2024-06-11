import {Request, Response } from 'express';

import pool from '../database';

class ProgramController{
    public async ListPrograms (req: Request,res: Response){
        const sql=`CALL listPrograms()`;
        try {
            const [rows] = await pool.query(sql);
            const programsList = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(programsList[0]);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al listar los programas');
        }
    }
    
    public async getProgram (req: Request,res: Response){
        const sql=`CALL getProgram(?)`;
        try {
            const [rows] = await pool.query(sql, [req.params.id]);
            const program = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(program[0]);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al obtener el programa');
        }
    }

    public async create (req: Request,res: Response){
        const sql=`CALL createProgram(?)`;
        await pool.query(sql, [req.body.program_name]);
        res.json({message: 'Program saved!'});
    }

    public async update (req: Request,res: Response){
        const sql=`CALL updateProgram(?, ?)`;
        await pool.query(sql, [req.params.id,req.body.program_name]);
        res.json({message: 'Program updated!'});
    }

    public async changeState (req: Request,res: Response){
        const sql=`CALL changeStateProgram(?, ?)`;
        await pool.query(sql, [req.params.id,req.params.state]);
        res.json({message: 'Program state changed!'});
    }

}

const programController = new ProgramController();
export default programController;