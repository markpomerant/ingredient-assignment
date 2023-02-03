import { kosModel, KosLog, Kos } from "@coca-cola/kos-ui-core";
import { IIngredientModel, IIngredientOptions } from "./types";

const MODEL_TYPE = "ingredient-model";

const log = KosLog.getLogger("ingredient-model");

@kosModel<IIngredientModel, IIngredientOptions>(MODEL_TYPE)
export class IngredientModel implements IIngredientModel {
  id: string;
  name: string;

  constructor(modelId: string, options: IIngredientOptions) {
    log.debug("creating new IngredientModel instance");
    this.id = modelId;
    this.name = options.name;
  }

  // -------------------LIFECYCLE----------------------------

  
}

const Registration = {
  registration: {
    [MODEL_TYPE]: {
      class: IngredientModel,
      singleton: false,
    },
  },
  type: MODEL_TYPE,
  factory: Kos.Factory.create<IIngredientModel, IIngredientOptions>(MODEL_TYPE),
};
export default Registration;
