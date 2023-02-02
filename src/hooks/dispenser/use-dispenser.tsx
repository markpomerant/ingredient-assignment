import { useKosModel } from "@coca-cola/kos-ui-components";
import { Dispenser, IDispenserModel } from "../../models/dispenser";

export const useDispenserModel = () => {
  const modelId = Dispenser.type;
  const result = useKosModel<IDispenserModel>({
    modelId,
    modelType: Dispenser.type,
  });

  return result;
};
