import {Request, Response } from 'express';

import pool from '../database';

class PeriodsController{
    public async ListPeriods (req: Request,res: Response){
        const sql=`CALL listPeriods()`;
        try {
            const [rows] = await pool.query(sql);
            const periodsList = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(periodsList[0]);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al listar los periodos');
        }
    }
    
    public async getPeriod (req: Request,res: Response){
        const sql=`CALL getPeriod(?)`;
        try {
            const [rows] = await pool.query(sql, [req.params.id]);
            const period = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(period[0]);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al obtener el periodo');
        }
    }

    public async create (req: Request,res: Response){
        const sql=`CALL createPeriod(?, ?, ?)`;
        await pool.query(sql, [req.body.period_start_date, req.body.period_end_date, req.body.period_name]);
        res.json({message: 'Period saved!'});
    }

    public async update (req: Request,res: Response){
        const sql=`CALL updatePeriod(?, ?, ?, ?)`;
        await pool.query(sql, [req.params.id,req.body.period_start_date, req.body.period_end_date, req.body.period_name]);
        res.json({message: 'Period updated!'});
    }

    public async changeState (req: Request,res: Response){
        const sql=`CALL changeStatePeriod(?, ?)`;
        await pool.query(sql, [req.params.id,req.params.state]);
        res.json({message: 'Period state changed!'});
    }

}

const periodsController = new PeriodsController();
export default periodsController;