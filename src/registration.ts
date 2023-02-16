import type { IKosRegistry } from "@coca-cola/kos-ui-core";

import { Dispenser } from "./models/dispenser";
import {Holder} from "./models/holder";
import {Ingredient} from "./models/ingredient";
import {IngredientContainer} from "./models/ingredient-container";
import { CoreModels} from "@coca-cola/kos-core-model";
import {Configuration} from "./models/configuration";
export const Registry: IKosRegistry = {
  models: {
    ...CoreModels,
    ...Dispenser.registration,
    ...IngredientContainer.registration,
    ...Ingredient.registration,
    ...Holder.registration,
    ...Configuration.registration
  },
  preloadModels: [Dispenser.type],
};
