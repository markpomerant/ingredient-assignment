import { useKosModel } from "@coca-cola/kos-ui-components";
import { Configuration, ConfigurationModel } from "../../models/configuration";

export const useConfigurationModel = () => {
  const modelId = Configuration.type;
  const result = useKosModel<ConfigurationModel>({
    modelId,
    modelType: Configuration.type,
    options: {},
  });

  return result;
};
