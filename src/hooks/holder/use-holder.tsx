import { useKosModel } from "@coca-cola/kos-ui-components";
import { Holder, IHolderModel } from "../../models/holder";

export const useHolderModel = (id: string) => {
  const modelId = id;

  const result = useKosModel<IHolderModel>({
    modelId,
    modelType: Holder.type,
  });

  return result;
};
