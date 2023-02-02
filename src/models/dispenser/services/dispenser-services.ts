import { ServiceFactory, resolveServiceUrl } from "@coca-cola/kos-ui-core";
const { URL } = resolveServiceUrl("DISPENSER_SERVICE");
const { getOne } = ServiceFactory.build({
  basePath: `${URL}/api/dispenser`,
});

interface DispenserResponse {
  id: string;
  name: string;
}
/**
 * @category Service
 * Retrieves the initial Dispenser data.
 */
export const getDispenser = async () => {
  const response = await getOne<DispenserResponse>({});
  return response;
};
