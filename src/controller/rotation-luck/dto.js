import { Joi, Segments} from "celebrate";

export const rotationLuckSchema = {
    [Segments.QUERY]: Joi.object().keys({
        date: Joi.string().required(),
        uid: Joi.string().required(),
        token: Joi.string().required(),
        // timeToLive: Joi.number().required(),
        // ip: Joi.string().required(),
    }),
}

export const rotationLuckSchemaResponse = {
    [Segments.BODY]: Joi.object().keys({
        uid: Joi.string().required(),
        token: Joi.string().required(),
        timeToLive: Joi.number().required(),
        ip: Joi.string().required(),
    }),
}

export const rotationLuckItemSchema = {
    [Segments.QUERY]: Joi.object().keys({
        // date: Joi.string().required(),
        uid: Joi.string().required(),
        token: Joi.string().required(),
        timeToLive: Joi.number().required(),
        ip: Joi.string().required(),
        name: Joi.string().required(),
        imageUrl: Joi.string().required(),
    }),
}

export const rotationLuckItemSchemaResponse = {
    [Segments.BODY]: Joi.object().keys({
        uid: Joi.string().required(),
        token: Joi.string().required(),
        timeToLive: Joi.number().required(),
        ip: Joi.string().required(),
        name: Joi.string().required(),
        imageUrl: Joi.string().required(),
    }),
}