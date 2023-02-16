import { ServiceFactory, resolveServiceUrl } from "@coca-cola/kos-ui-core";
const { URL } = resolveServiceUrl("INGREDIENT_SERVICE");
const { getAll } = ServiceFactory.build({
  basePath: `${URL}/api/kos/ingredients`,
});

type BEV_TYPES = "CARB_BEV" | "FLAVOR" | "WATER" | "CARB" | "PLAIN_BEV"
interface IngredientResponse {
  id: string;
  name: string;
  type: BEV_TYPES;
  ratio: number;
}
/**
 * @category Service
 * Retrieves the initial Ingredient data.
 */
export const getIngredients = async () => {
  const response = await getAll<IngredientResponse>({});
  return response;
};
