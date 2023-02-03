import {kosModel, KosLog, Kos} from "@coca-cola/kos-ui-core";
import {addAssignment, deleteAssignment} from "./services/assignment-services";

import {IHolderModel, IHolderOptions} from "./types";

const MODEL_TYPE = "holder-model";
const log = KosLog.getLogger("holder-model");

@kosModel<IHolderModel, IHolderOptions>(MODEL_TYPE)
export class HolderModel implements IHolderModel {
    id: string;
    name: string;
    private _ingredient?: string;

    constructor(modelId: string, options: IHolderOptions) {
        this.id = modelId;
        this.name = options.name;
        this._ingredient = "";
    }
    get ingredient() {
        return this._ingredient;
    }

    updateIngredientAssignment(ingredient?: string) {
        this._ingredient = ingredient
    }
    async init(): Promise<void> {
        log.info("initializing holder");
    }

    async assignIngredient(ingredientId: string) {
        addAssignment({ingredientId, holderPath: this.id})
    }

    async deleteIngredient() {
        deleteAssignment(this.id);
    }
    
    get canAssign() {
        return !this._ingredient;
    }
}

const Registration = {
    registration: {
        [MODEL_TYPE]: {
            class: HolderModel
        }
    },
    type: MODEL_TYPE,
    factory: Kos.Factory.create<IHolderModel, IHolderOptions>(MODEL_TYPE)
   
}
export default Registration;