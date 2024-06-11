"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = require("mysql2/promise");
const keys_1 = __importDefault(require("./keys"));
const pool = (0, promise_1.createPool)({
    host: keys_1.default.database.host,
    user: keys_1.default.database.user,
    password: keys_1.default.database.password,
    database: keys_1.default.database.database,
});
pool
    .getConnection()
    .then((connection) => {
    console.log('DB is connected');
    connection.release();
})
    .catch((err) => {
    console.error('Error connecting to database: ', err);
});
exports.default = pool;
