import type { IKosRegistry } from "@coca-cola/kos-ui-core";
import { Dispenser } from "./models/dispenser";
export const Registry: IKosRegistry = {
  models: {
    ...Dispenser.registration,
  },
  preloadModels: [Dispenser.type],
};
