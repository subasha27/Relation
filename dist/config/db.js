"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('class', 'root', 'rootpass', {
    host: 'localhost',
    dialect: 'mysql'
});
sequelize.authenticate().then(() => {
    console.log("Connection established Succesfully");
}).catch((error) => {
    console.error("Connection Error", error);
});
exports.default = sequelize;
