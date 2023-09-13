import { Request, Response } from "express";
import Parent_navigation from "../Model/parentModel";
import child_navigation from "../Model/childModel";
import { childSchema, parentSchema } from "../validation/validate";


class relationCrud {

    async createParent(req: Request, res: Response) {
        const parentData = req.body;
        try {
            const validation = parentSchema.validate(parentData);
            if (validation.error) return res.send({ message: validation.error.details[0].message });
            const existingParentData = await Parent_navigation.findOne({ where: { name: parentData.name } });
            if (existingParentData) return res.status(200).send({ message: "Parent Already exists" })

            const parent = await Parent_navigation.create(parentData);
            const id = parent.id
            return res.status(200).send({ message: "parent created succesfully", id })

        } catch (error) {
            console.log(error)
            res.status(500).send({ message: "Server Error" })
        }
    }
    async createChild(req: Request, res: Response) {
        const childData = req.body;
        try {
            const validation = childSchema.validate(childData);
            if (validation.error) return res.send({ message: validation.error.details[0].message });
            const existingParentData = await child_navigation.findOne({ where: { name: childData.name } });
            if (existingParentData) return res.status(200).send({ message: "child Already exists" });
            const parentCheck = await Parent_navigation.findOne({where:{id:childData.parent_id}});
            if (!parentCheck) return res.status(200).send({ message: "Parent does not exists" });
            const parent = await child_navigation.create(childData);
            const id = parent.id
            return res.status(200).send({ message: "child created succesfully", id })

        } catch (error) {
            console.log(error)
            res.status(500).send({ message: "Server Error" })
        }
    }

    async update(req: Request, res: Response) {
        const relationData = req.body;//parentId,convertoparentId child , {parentToChild, childToParent, childInterchange}<=Condition
        try {
            if (relationData.condition1 === 'parentToChild') {
                const existingParent = await Parent_navigation.findByPk(relationData.parentId);
                if (existingParent) {
                    const parentName = existingParent.name
                    await child_navigation.destroy({ where: { parent_id: relationData.parentId } });
                    await existingParent.destroy();
                    await child_navigation.upsert({
                        name: parentName,
                        parent_id: relationData.newParentId,
                    });
                    console.log("parentToChild")

                }
            }
            if (relationData.condition2 === 'childToParent') {
                const existingChild = await child_navigation.findByPk(relationData.childId);
                if (existingChild) {
                    const parentName = existingChild.name
                    await existingChild.destroy();
                    await Parent_navigation.upsert({
                        name: parentName,
                    });
                    console.log("childToParent")

                }
            }
            if (relationData.condition3 === 'InterchangeChild') {
                const firstParentId = req.body.parentID1
                const secondParentId = req.body.parentID2
                const temp = 0;

                if (typeof firstParentId !== 'undefined' && typeof secondParentId !== 'undefined') {

                    await child_navigation.update(
                        { parent_id: temp },
                        { where: { parent_id: firstParentId } }
                    );


                    await child_navigation.update(
                        { parent_id: firstParentId },
                        { where: { parent_id: secondParentId } }
                    );
                    await child_navigation.update(
                        { parent_id: secondParentId },
                        { where: { parent_id: temp } }
                    );
                    console.log("InterchangeChild")
                    if (relationData.condition4 === 'childToChild') {
                        const existingChild = await child_navigation.findByPk(relationData.childId4);
                        if (existingChild) {
                            const parentName = existingChild.name
                            await existingChild.update(relationData.newParentId4)
                            console.log("childToChild")
        
                        }
                    }

                } else {
                    return res.status(400).json({ message: "Invalid parent IDs provided" });
                }
            }
            return res.status(200).json({ message: "Updated successfully" });
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: "Server Error" })
        }
    }

}

export default new relationCrud();