import {Request, Response } from 'express';

import pool from '../database';

class TeacherController{
    public async ListTeachers (req: Request,res: Response){
        const sql=`CALL listTeachers()`;
        try {
            const [rows] = await pool.query(sql);
            const teachersList = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(teachersList[0]);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al listar los profesores');
        }
    }
    
    public async getTeacher (req: Request,res: Response){
        const sql=`CALL getTeacher(?)`;
        try {
            const [rows] = await pool.query(sql, [req.params.id]);
            const teacher = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(teacher[0]);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al obtener el profesor');
        }
    }

    public async create (req: Request,res: Response){
        const sql=`CALL createTeacher(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        await pool.query(sql, [req.body.teacher_name,
                                req.body.teacher_lastname,
                                req.body.teacher_dnitype,
                                req.body.teacher_dni,
                                req.body.teacher_type,
                                req.body.teacher_contracttype,
                                req.body.teacher_area,
                                req.body.user_login,
                                req.body.user_pwd]);
        res.json({message: 'Teacher saved!'});
    }

    public async update (req: Request,res: Response){
        const sql=`CALL updateTeacher(?, ?, ?, ?, ?, ?, ?, ?)`;
        await pool.query(sql, [req.params.id,
                                req.body.teacher_name,
                                req.body.teacher_lastname,
                                req.body.teacher_dnitype,
                                req.body.teacher_dni,
                                req.body.teacher_type,
                                req.body.teacher_contracttype,
                                req.body.teacher_area]);
        res.json({message: 'Teacher updated!'});
    }

    public async changeState (req: Request,res: Response){
        const sql=`CALL changeStateTeacher(?, ?)`;
        await pool.query(sql, [req.params.id,req.params.state]);
        res.json({message: 'Teacher state changed!'});
    }

}

const teacherController = new TeacherController();
export default teacherController;