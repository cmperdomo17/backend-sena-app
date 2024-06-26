"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class ScheduleController {
    ListAllSchedules(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL listSchedulesAll()`;
            try {
                const [rows] = yield database_1.default.query(sql);
                const schedulesList = Object.values(JSON.parse(JSON.stringify(rows)));
                res.json(schedulesList[0]);
            }
            catch (err) {
                console.error(err);
                res.status(500).send('Error al listar todos los horarios');
            }
        });
    }
    ListSchedulesPeriodTeacher(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL listSchedulesPeriodTeacher(?, ?)`;
            try {
                const [rows] = yield database_1.default.query(sql, [req.params.Tid, req.params.Pid]);
                const schedulesList = Object.values(JSON.parse(JSON.stringify(rows)));
                res.json(schedulesList[0]);
            }
            catch (err) {
                console.error(err);
                res.status(500).send('Error al listar los horarios del periodo del profesor');
            }
        });
    }
    getSchedule(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL getSchedule(?)`;
            try {
                const [rows] = yield database_1.default.query(sql, [req.params.id]);
                const schedule = Object.values(JSON.parse(JSON.stringify(rows)));
                res.json(schedule[0]);
            }
            catch (err) {
                console.error(err);
                res.status(500).send('Error al obtener el horario');
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body.ambient_id);
            const sql = `CALL createSchedule(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            yield database_1.default.query(sql, [req.body.ambient_id,
                req.body.teacher_id,
                req.body.period_id,
                req.body.competence_id,
                req.body.competence_type,
                req.body.schedule_day,
                req.body.schedule_start_hour,
                req.body.schedule_end_hour,
                req.body.schedule_duration]);
            res.json({ message: 'Schedule saved!' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL updateSchedule(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            yield database_1.default.query(sql, [req.params.id,
                req.body.ambient_id,
                req.body.teacher_id,
                req.body.period_id,
                req.body.competence_id,
                req.body.competence_type,
                req.body.schedule_day,
                req.body.schedule_start_hour,
                req.body.schedule_end_hour,
                req.body.schedule_duration]);
            res.json({ message: 'Schedule updated!' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL deleteSchedule(?)`;
            yield database_1.default.query(sql, [req.params.id]);
            res.json({ message: 'Schedule deleted!' });
        });
    }
}
const scheduleController = new ScheduleController();
exports.default = scheduleController;
