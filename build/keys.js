"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
exports.default = {
    database: {
        host: config_1.DB_HOST,
        user: config_1.DB_USER,
        password: config_1.DB_PASSWORD,
        database: config_1.DB_NAME,
        port: config_1.DB_PORT
    }
};
