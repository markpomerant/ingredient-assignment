import type { IKosRegistry } from "@coca-cola/kos-ui-core";
import { Dispenser } from "./models/dispenser";
import {Holder} from "./models/holder";
import {Ingredient} from "./models/ingredient";
import {IngredientContainer} from "./models/ingredient-container";
export const Registry: IKosRegistry = {
  models: {
    ...Dispenser.registration,
    ...IngredientContainer.registration,
    ...Ingredient.registration,
    ...Holder.registration,
  },
  preloadModels: [Dispenser.type],
};
