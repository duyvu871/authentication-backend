import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Joi, Segments } from "celebrate";

export const authSchema = {
    [Segments.BODY]: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
        isRemember: Joi.boolean().required(),
    }),
}

export const registrySchema = {
    [Segments.BODY]: Joi.object().keys({
        // email: Joi.string().required(),
        password: Joi.string().required(),
        username: Joi.string().required(),
        // phone: Joi.string().required(),
        // address: Joi.string().required(),
    })
}
