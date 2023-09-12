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
const parentModel_1 = __importDefault(require("../Model/parentModel"));
const childModel_1 = __importDefault(require("../Model/childModel"));
const validate_1 = require("../validation/validate");
class relationCrud {
    createParent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const parentData = req.body;
            try {
                const validation = validate_1.parentSchema.validate(parentData);
                if (validation.error)
                    return res.send({ message: validation.error.details[0].message });
                const existingParentData = yield parentModel_1.default.findOne({ where: { name: parentData.name } });
                if (existingParentData)
                    return res.status(200).send({ message: "Parent Already exists" });
                const parent = yield parentModel_1.default.create(parentData);
                const id = parent.id;
                return res.status(200).send({ message: "parent created succesfully", id });
            }
            catch (error) {
                console.log(error);
                res.status(500).send({ message: "Server Error" });
            }
        });
    }
    createChild(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const childData = req.body;
            try {
                const validation = validate_1.childSchema.validate(childData);
                if (validation.error)
                    return res.send({ message: validation.error.details[0].message });
                const existingParentData = yield childModel_1.default.findOne({ where: { name: childData.name } });
                if (existingParentData)
                    return res.status(200).send({ message: "child Already exists" });
                const parent = yield childModel_1.default.create(childData);
                const id = parent.id;
                return res.status(200).send({ message: "child created succesfully", id });
            }
            catch (error) {
                console.log(error);
                res.status(500).send({ message: "Server Error" });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const relationData = req.body; //parentId,convertoparentId child , {parentToChild, childToParent, childInterchange}<=Condition
            try {
                if (relationData.condition1 === 'parentToChild') {
                    const existingParent = yield parentModel_1.default.findByPk(relationData.parentId);
                    if (existingParent) {
                        const parentName = existingParent.name;
                        yield childModel_1.default.destroy({ where: { parent_id: relationData.parentId } });
                        yield existingParent.destroy();
                        yield childModel_1.default.upsert({
                            name: parentName,
                            parent_id: relationData.newParentId,
                        });
                        console.log("parentToChild");
                    }
                }
                if (relationData.condition2 === 'childToParent') {
                    const existingChild = yield childModel_1.default.findByPk(relationData.childId);
                    if (existingChild) {
                        const parentName = existingChild.name;
                        yield existingChild.destroy();
                        yield parentModel_1.default.upsert({
                            name: parentName,
                        });
                        console.log("childToParent");
                    }
                }
                if (relationData.condition3 === 'InterchangeChild') {
                    const firstParentId = req.body.parentID1;
                    const secondParentId = req.body.parentID2;
                    const temp = 0;
                    if (typeof firstParentId !== 'undefined' && typeof secondParentId !== 'undefined') {
                        yield childModel_1.default.update({ parent_id: temp }, { where: { parent_id: firstParentId } });
                        yield childModel_1.default.update({ parent_id: firstParentId }, { where: { parent_id: secondParentId } });
                        yield childModel_1.default.update({ parent_id: secondParentId }, { where: { parent_id: temp } });
                        console.log("InterchangeChild");
                        if (relationData.condition4 === 'childToChild') {
                            const existingChild = yield childModel_1.default.findByPk(relationData.childId4);
                            if (existingChild) {
                                const parentName = existingChild.name;
                                yield existingChild.update(relationData.newParentId4);
                                console.log("childToChild");
                            }
                        }
                    }
                    else {
                        return res.status(400).json({ message: "Invalid parent IDs provided" });
                    }
                }
                return res.status(200).json({ message: "Updated successfully" });
            }
            catch (error) {
                console.log(error);
                res.status(500).send({ message: "Server Error" });
            }
        });
    }
}
exports.default = new relationCrud();
