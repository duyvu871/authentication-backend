import { Joi, Segments} from "celebrate";

export const OrderSchema = {
    [Segments.QUERY]: Joi.object().keys({
        // date: Joi.string().required(),
        // uid: Joi.string().required(),
        // token: Joi.string().required(),
    }),
}


