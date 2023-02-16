import { IKosModelContainer, KosModelContainer,kosModel, KosLog, Kos } from "@coca-cola/kos-ui-core";
import {IIngredientModel, Ingredient, Services} from "../ingredient";
import {
  IIngredientContainerModel,
  IIngredientContainerOptions,
} from "./types";


const MODEL_TYPE = "ingredient-container-model";

const log = KosLog.getLogger("ingredient container-model");

const ingredientFilterIndex = (model: IIngredientModel) =>  {
  switch (model.type) {
   case "FLAVOR":
       return "AMBIENT";
    case "WATER":
    case "CARB":
     return "WATER";
   default:
     return "SYRUP";
 }
}
@kosModel<IIngredientContainerModel, IIngredientContainerOptions>(MODEL_TYPE)
export class IngredientContainerModel implements IIngredientContainerModel {
  id: string;
  container: IKosModelContainer<IIngredientModel>

  constructor(modelId: string, options: IIngredientContainerOptions) {
    this.id = modelId;
    this.container = new KosModelContainer<IIngredientModel>({sortKey: "name", indexMap: { 
     holder: ingredientFilterIndex
    }
  });
    
  }

  // -------------------LIFECYCLE----------------------------

  async init(): Promise<void> {
    log.debug("initializing ingredient container");
  }

  async load(): Promise<void> {
    log.debug("loading ingredient container");
    const ingredients = await Services.getIngredients();
     ingredients?.data.forEach((ingredientData) => {
        const ingredient = Ingredient.factory(ingredientData.id)(ingredientData);
        this.container.addModel(ingredient);
     })
  }

  getChildren() {
    return [...this.container.data]
  }
}

const Registration = {
  registration: {
    [MODEL_TYPE]: {
      class: IngredientContainerModel,
      singleton: true,
    },
  },
  type: MODEL_TYPE,
  factory: Kos.Factory.create<
    IIngredientContainerModel,
    IIngredientContainerOptions
  >(MODEL_TYPE),
};
export default Registration;
