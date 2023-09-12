"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class child_navigation extends sequelize_1.Model {
}
child_navigation.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    parent_id: {
        type: sequelize_1.DataTypes.INTEGER,
    }
}, {
    sequelize: db_1.default,
    modelName: 'child_navigation',
    timestamps: true,
});
exports.default = child_navigation;
