import {ListItems, targetID} from "../../configs/rotation-item.config.js";
import AuthModel from "../../models/auth.model.js";
// import {rotationLuckSchema, rotationLuckSchemaResponse} from "./dto.js";
export class RotationLuckService {
    constructor() {
        this.rotationTargetItem = 1;
    }
    async create(user, rotationData) {
        const result = await AuthModel.findOneAndUpdate(
            { email:  user.email},
            {$push: { rotation_transaction: { ...rotationData,}}},
            { new: true }
        );
        return result;
    }

    setRotationTargetItem(rotationTargetItem) {
        this.rotationTargetItem = rotationTargetItem;
        return this.rotationTargetItem;
    }

    getRotationTargetItem() {
        return this.rotationTargetItem;
    }

    generateRotationLuck() {
      // return new Promise((resolve, reject) => {
        const rotationTargetItemIndex = ListItems.findIndex(item => item.id === targetID);
        // resolve(rotationTargetItem);
      // });
        return ListItems[rotationTargetItemIndex];
    }
}