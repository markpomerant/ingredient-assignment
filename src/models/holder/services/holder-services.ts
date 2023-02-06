
import { ServiceFactory, resolveServiceUrl } from "@coca-cola/kos-ui-core";

interface Pump {
  category: string;
  inserted: boolean;
  beveragePour: boolean;
  ingredientPour: boolean;
  type: string;
  boardPath: string;
  nozzlePath: string;
  holderPath: string;
  name: string;
  path: string;
}

export interface HolderResponse {
  assembly: string;
  name: string;
  path: string;
  pumps: Pump[];
}


const { URL } = resolveServiceUrl("DISPENSER_SERVICE");
const { getAll } = ServiceFactory.build({
    basePath: `${URL}/api/kos/holders`,
  });

/**
 * @category Service
 * Retrieves the initial dispenser data.
 */
 export const getHolders = async () => {

    const response = await getAll<HolderResponse>({});
    return response;
  };