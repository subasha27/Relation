"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Controller_1 = __importDefault(require("../controller/Controller"));
const router = express_1.default.Router();
router.post('/parent', Controller_1.default.createParent);
router.post('/child', Controller_1.default.createChild);
router.post('/update', Controller_1.default.update);
exports.default = router;
