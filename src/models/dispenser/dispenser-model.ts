import { kosModel, KosLog, Kos, kosAction } from "@coca-cola/kos-ui-core";
import { IDispenserModel, IDispenserOptions } from "./types";
import { getDispenser } from "./services";

const MODEL_TYPE = "dispenser-model";

const log = KosLog.getLogger("dispenser-model");

@kosModel<IDispenserModel, IDispenserOptions>(MODEL_TYPE)
export class DispenserModel implements IDispenserModel {
  id: string;
  name: string;
  constructor(modelId: string, options: IDispenserOptions) {
    this.id = modelId;
    this.name = "";
    log.info(`dispenser options: ${options}`);
  }

  // -------------------LIFECYCLE----------------------------

  async init(): Promise<void> {
    log.debug("initializing dispenser");
  }

  async load(): Promise<void> {
    log.debug("loading dispenser");
    try {
      const response = await getDispenser();

      kosAction(() => {
        this.name = response?.data.name || "";
      });
    } catch (e) {
      log.error(e);
      throw e;
    }
  }

  async ready(): Promise<void> {
    log.debug("initializing dispenser");
  }

  async unload(): Promise<void> {
    log.debug("initializing dispenser");
  }

  async activate(): Promise<void> {
    log.debug("initializing dispenser");
  }

  async deactivate(): Promise<void> {
    log.debug("initializing dispenser");
  }
}

const Registration = {
  registration: {
    [MODEL_TYPE]: {
      class: DispenserModel,
      singleton: true,
    },
  },
  type: MODEL_TYPE,
  factory: Kos.Factory.create<IDispenserModel, IDispenserOptions>(MODEL_TYPE),
};
export default Registration;
