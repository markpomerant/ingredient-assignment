import { ServiceFactory, resolveServiceUrl } from "@coca-cola/kos-ui-core";
const { URL } = resolveServiceUrl("INGREDIENT_SERVICE");
const { getAll } = ServiceFactory.build({
  basePath: `${URL}/api/ingredients`,
});

interface IngredientResponse {
  id: string;
  name: string;
}
/**
 * @category Service
 * Retrieves the initial Ingredient data.
 */
export const getIngredients = async () => {
  const response = await getAll<IngredientResponse>({});
  return response;
};
