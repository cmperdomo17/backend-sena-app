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
class TeacherController {
    ListTeachers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL listTeachers()`;
            try {
                const [rows] = yield database_1.default.query(sql);
                const teachersList = Object.values(JSON.parse(JSON.stringify(rows)));
                res.json(teachersList[0]);
            }
            catch (err) {
                console.error(err);
                res.status(500).send('Error al listar los profesores');
            }
        });
    }
    getTeacher(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL getTeacher(?)`;
            try {
                const [rows] = yield database_1.default.query(sql, [req.params.id]);
                const teacher = Object.values(JSON.parse(JSON.stringify(rows)));
                res.json(teacher[0]);
            }
            catch (err) {
                console.error(err);
                res.status(500).send('Error al obtener el profesor');
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL createTeacher(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            yield database_1.default.query(sql, [req.body.teacher_name,
                req.body.teacher_lastname,
                req.body.teacher_dnitype,
                req.body.teacher_dni,
                req.body.teacher_type,
                req.body.teacher_contracttype,
                req.body.teacher_area,
                req.body.user_login,
                req.body.user_pwd]);
            res.json({ message: 'Teacher saved!' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL updateTeacher(?, ?, ?, ?, ?, ?, ?, ?)`;
            yield database_1.default.query(sql, [req.params.id,
                req.body.teacher_name,
                req.body.teacher_lastname,
                req.body.teacher_dnitype,
                req.body.teacher_dni,
                req.body.teacher_type,
                req.body.teacher_contracttype,
                req.body.teacher_area]);
            res.json({ message: 'Teacher updated!' });
        });
    }
    changeState(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL changeStateTeacher(?, ?)`;
            yield database_1.default.query(sql, [req.params.id, req.params.state]);
            res.json({ message: 'Teacher state changed!' });
        });
    }
}
const teacherController = new TeacherController();
exports.default = teacherController;
