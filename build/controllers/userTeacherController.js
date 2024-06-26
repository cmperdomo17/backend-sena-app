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
class UserTeacherController {
    getTeacherT(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL getTeacherByUserId(?)`;
            try {
                const [rows] = yield database_1.default.query(sql, [req.body.user_id]);
                const teacher = Object.values(JSON.parse(JSON.stringify(rows)));
                res.json(teacher[0]);
            }
            catch (err) {
                console.error(err);
                res.status(500).send('Error al obtener el profesor');
            }
        });
    }
    ListSchedulesPeriodTeacherT(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL listSchedulesPeriodTeacher(?, ?)`;
            try {
                const [rows] = yield database_1.default.query(sql, [req.body.teacher_id, req.params.Pid]);
                const schedulesList = Object.values(JSON.parse(JSON.stringify(rows)));
                res.json(schedulesList[0]);
            }
            catch (err) {
                console.error(err);
                res.status(500).send('Error al listar los horarios del periodo del profesor');
            }
        });
    }
    ListPeriodsT(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL listPeriods()`;
            const periodsList = yield new Promise((resolve, reject) => {
                database_1.default.query(sql, (err, rows, fields) => {
                    if (err)
                        reject(err); // En caso de error, resolvemos la Promise con error
                    resolve(Object.values(JSON.parse(JSON.stringify(rows)))); // Si no, resolvemos con el resultado
                });
            });
            res.json(periodsList[0]);
        });
    }
    ListCompetenciesT(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL listCompetencies()`;
            const competenciesList = yield new Promise((resolve, reject) => {
                database_1.default.query(sql, (err, rows, fields) => {
                    if (err)
                        reject(err); // En caso de error, resolvemos la Promise con error
                    resolve(Object.values(JSON.parse(JSON.stringify(rows)))); // Si no, resolvemos con el resultado
                });
            });
            res.json(competenciesList[0]);
        });
    }
    ListAmbientsT(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL listAmbients()`;
            const ambientsList = yield new Promise((resolve, reject) => {
                database_1.default.query(sql, (err, rows, fields) => {
                    if (err)
                        reject(err); // En caso de error, resolvemos la Promise con error
                    resolve(Object.values(JSON.parse(JSON.stringify(rows)))); // Si no, resolvemos con el resultado
                });
            });
            res.json(ambientsList[0]);
        });
    }
}
const userTeacherController = new UserTeacherController();
exports.default = userTeacherController;
