import * as joi from "@hapi/joi";

export const parentSchema = joi.object({
    name:joi.string().min(4).max(12).required()
})

export const childSchema = joi.object({
    name:joi.string().min(4).max(12).required(),
    parent_id:joi.number().required()
})