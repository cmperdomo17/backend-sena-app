import {Request, Response } from 'express';

import pool from '../database';

class AmbientController{
    public async ListAmbients (req: Request, res: Response){
        const sql=`CALL listAmbients()`;
        try {
            const [rows] = await pool.query(sql);
            const ambientsList = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(ambientsList[0]);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al listar los ambientes');
        }
    }

    public async getAmbient (req: Request,res: Response){
        const sql=`CALL getAmbient(?)`;
        try {
            const [rows] = await pool.query(sql, [req.params.id]);
            const ambient = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(ambient[0]);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al obtener el ambiente');
        }
    }

    public async create (req: Request,res: Response){
        const sql=`CALL createAmbient(?, ?, ?, ?, ?)`;
        await pool.query(sql, [req.body.ambient_id,
                                req.body.ambient_name,
                                req.body.ambient_location,
                                req.body.ambient_type,
                                req.body.ambient_capacity]);
        res.json({message: 'Ambient saved!'});
    }

    public async update (req: Request,res: Response){
        const sql=`CALL updateAmbient(?, ?, ?, ?, ?)`;
        await pool.query(sql, [req.params.id,
                                req.body.ambient_name,
                                req.body.ambient_location,
                                req.body.ambient_type,
                                req.body.ambient_capacity]);
        res.json({message: 'Ambient updated!'});
    }

    public async changeState (req: Request,res: Response){
        const sql=`CALL changeStateAmbient(?, ?)`;
        await pool.query(sql, [req.params.id,req.params.state]);
        res.json({message: 'Ambient state changed!'});
    }

}

const ambientController = new AmbientController();
export default ambientController;