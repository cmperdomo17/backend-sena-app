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
class UsersController {
    ListUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL listUsers()`;
            try {
                const [rows] = yield database_1.default.query(sql);
                const usersList = Object.values(JSON.parse(JSON.stringify(rows)));
                return usersList[0];
            }
            catch (err) {
                console.error(err);
                throw new Error('Error al listar los usuarios');
            }
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL getUser(?)`;
            try {
                const [rows] = yield database_1.default.query(sql, [id]);
                const user = Object.values(JSON.parse(JSON.stringify(rows)));
                return user[0];
            }
            catch (err) {
                console.error(err);
                throw new Error('Error al obtener el usuario');
            }
        });
    }
    create(user_login, user_pwd) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL createUser(?, ?)`;
            yield database_1.default.query(sql, [user_login, user_pwd]);
        });
    }
    update(user_id, user_login, user_pwd) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL updateUser(?, ?, ?)`;
            yield database_1.default.query(sql, [user_id, user_login, user_pwd]);
        });
    }
    changeState(id, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL changeStateUser(?, ?)`;
            yield database_1.default.query(sql, [id, state]);
        });
    }
}
const usersController = new UsersController();
exports.default = usersController;
