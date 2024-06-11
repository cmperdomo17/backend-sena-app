import {Request, Response } from 'express';

import pool from '../database';

class ScheduleController{
    public async ListAllSchedules (req: Request,res: Response){
        const sql=`CALL listSchedulesAll()`;
        try {
            const [rows] = await pool.query(sql);
            const schedulesList = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(schedulesList[0]);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al listar todos los horarios');
        }
    }
    
    public async ListSchedulesPeriodTeacher (req: Request,res: Response){
        const sql=`CALL listSchedulesPeriodTeacher(?, ?)`;
        try {
            const [rows] = await pool.query(sql, [req.params.Tid, req.params.Pid]);
            const schedulesList = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(schedulesList[0]);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al listar los horarios del periodo del profesor');
        }
    }

    public async getSchedule (req: Request,res: Response){
        const sql=`CALL getSchedule(?)`;
        try {
            const [rows] = await pool.query(sql, [req.params.id]);
            const schedule = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(schedule[0]);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al obtener el horario');
        }
    }

    public async create (req: Request,res: Response){
        console.log(req.body.ambient_id);
        const sql=`CALL createSchedule(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        await pool.query(sql, [req.body.ambient_id,
                                req.body.teacher_id,
                                req.body.period_id,
                                req.body.competence_id,
                                req.body.competence_type,
                                req.body.schedule_day,
                                req.body.schedule_start_hour,
                                req.body.schedule_end_hour,
                                req.body.schedule_duration]);
        res.json({message: 'Schedule saved!'});
    }

    public async update (req: Request,res: Response){
        const sql=`CALL updateSchedule(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        await pool.query(sql, [req.params.id,
                                req.body.ambient_id,
                                req.body.teacher_id,
                                req.body.period_id,
                                req.body.competence_id,
                                req.body.competence_type,
                                req.body.schedule_day,
                                req.body.schedule_start_hour,
                                req.body.schedule_end_hour,
                                req.body.schedule_duration]);
        res.json({message: 'Schedule updated!'});
    }

    public async delete (req: Request,res: Response){
        const sql=`CALL deleteSchedule(?)`;
        await pool.query(sql, [req.params.id]);
        res.json({message: 'Schedule deleted!'});
    }

}

const scheduleController = new ScheduleController();
export default scheduleController;