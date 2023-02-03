import { useKosModel } from "@coca-cola/kos-ui-components";
import {
  IngredientContainer,
  IIngredientContainerModel,
} from "../../models/ingredient-container";

export const useIngredientContainerModel = () => {
  const modelId = IngredientContainer.type;
  const result = useKosModel<IIngredientContainerModel>({
    modelId,
    modelType: IngredientContainer.type,
  });

  return result;
};
