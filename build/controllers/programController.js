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
class ProgramController {
    ListPrograms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL listPrograms()`;
            try {
                const [rows] = yield database_1.default.query(sql);
                const programsList = Object.values(JSON.parse(JSON.stringify(rows)));
                res.json(programsList[0]);
            }
            catch (err) {
                console.error(err);
                res.status(500).send('Error al listar los programas');
            }
        });
    }
    getProgram(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL getProgram(?)`;
            try {
                const [rows] = yield database_1.default.query(sql, [req.params.id]);
                const program = Object.values(JSON.parse(JSON.stringify(rows)));
                res.json(program[0]);
            }
            catch (err) {
                console.error(err);
                res.status(500).send('Error al obtener el programa');
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL createProgram(?)`;
            yield database_1.default.query(sql, [req.body.program_name]);
            res.json({ message: 'Program saved!' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL updateProgram(?, ?)`;
            yield database_1.default.query(sql, [req.params.id, req.body.program_name]);
            res.json({ message: 'Program updated!' });
        });
    }
    changeState(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL changeStateProgram(?, ?)`;
            yield database_1.default.query(sql, [req.params.id, req.params.state]);
            res.json({ message: 'Program state changed!' });
        });
    }
}
const programController = new ProgramController();
exports.default = programController;
