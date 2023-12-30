import { Joi, Segments} from "celebrate";

export const OrderSchema = {
    [Segments.QUERY]: Joi.object().keys({
        // date: Joi.string().required(),
        // uid: Joi.string().required(),
        // token: Joi.string().required(),
    }),
}

export const CollectionCreateSchema = {
    [Segments.BODY]: Joi.object().keys({
        // result: Joi.array().items(joi.object().keys({
            id: Joi.string().required(),
            bet: Joi.number().required(),
            betFee: Joi.number().required(),
            betWin: Joi.number().required(),
            timeStart: Joi.date().required(),
            timeEnd: Joi.date().required(),
            status: Joi.string().required(),
        // })).required(),
    }),
}
