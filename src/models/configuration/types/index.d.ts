import { IKosDataModel } from "@coca-cola/kos-ui-core";
import type { KosConfigProperty } from "@coca-cola/kos-core-model";

export interface ConfigurationOptions {}

export interface ConfigurationModel
  extends ConfigurationOptions,
    IKosDataModel {
  id: string;
  resolveDelayMs: KosConfigProperty<number>;
  maxPourVolumeMl: KosConfigProperty<number>;
  disablePumpTempC: KosConfigProperty<number>;
  cupName: KosConfigProperty<string>;
  measurementSystem: KosConfigProperty<string>;
  computedValue: number;
}
