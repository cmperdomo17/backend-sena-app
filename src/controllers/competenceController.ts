import {Request, Response } from 'express';

import pool from '../database';

class CompetenceController{
    public async ListCompetencies (req: Request,res: Response){
        const sql=`CALL listCompetencies()`;
        try {
            const [rows] = await pool.query(sql);
            const competenciesList = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(competenciesList[0]);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al listar las competencias');
        }
    }
    
    public async getCompetence (req: Request,res: Response){
        const sql=`CALL getCompetence(?, ?)`;
        try {
            const [rows] = await pool.query(sql, [req.params.id, req.params.type]);
            const competence = Object.values(JSON.parse(JSON.stringify(rows)));
            res.json(competence[0]);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al obtener la competencia');
        }
    }

    public async create (req: Request,res: Response){
        const sql=`CALL createCompetence(?, ?)`;
        await pool.query(sql, [req.body.competence_name,
                                req.body.program_id]);
        res.json({message: 'Competence saved!'});
    }

    public async update (req: Request,res: Response){
        const sql=`CALL updateCompetence(?, ?, ?)`;
        await pool.query(sql, [req.params.id,
                                req.body.program_id,
                                req.body.competence_name]);
        res.json({message: 'Competence updated!'});
    }

    public async changeState (req: Request,res: Response){
        const sql=`CALL changeStateCompetence(?, ?, ?)`;
        await pool.query(sql, [req.params.id, req.body.competence_type, req.params.state]);
        res.json({message: 'Competence state changed!'});
    }

    public async delete (req: Request,res: Response) {
        const sql=`CALL deleteCompetence(?, ?)`;
        await pool.query(sql, [req.params.id, req.params.program_id]);
        res.json({message: 'Competence deleted!'});
    }

}

const competenceController = new CompetenceController();
export default competenceController;