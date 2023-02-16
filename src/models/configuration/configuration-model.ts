import { kosModel, KosLog, Kos } from "@coca-cola/kos-ui-core";
import { ConfigurationModel, ConfigurationOptions } from "./types";
import { KosConfigProperty, kosConfigProperty } from "@coca-cola/kos-core-model";


const MODEL_TYPE = "configuration-model";

const log = KosLog.getLogger("configuration-model");

@kosModel<ConfigurationModel, ConfigurationOptions>(MODEL_TYPE)
class ConfigurationModelImpl implements ConfigurationModel {
  id: string;

  @kosConfigProperty({ path: "system.app", 
  attribute: "resolveDelayMs", 
  converter: {
    from: "ms", 
    to: "seconds"
  }, 
  formatter:{
    style: "unit",
    unit: "second",
    maximumFractionDigits: 0
  } })
  resolveDelayMs: KosConfigProperty<number>;

  @kosConfigProperty({ path: "system.app", 
  attribute: "maxPourVolumeMl", 
  converter: {
    from: "ml", 
    to: "fl oz (US)"}, 
  formatter: {
    style: "unit", 
    unit: "ounce"} 
  })
  maxPourVolumeMl: KosConfigProperty<number>;

  @kosConfigProperty({ path: "system.app",
  attribute: "disablePumpTempC" ,
  converter: {
    from: "C", 
    to: "F"
  }, 
  formatter: {
    style: "unit", 
    unit: "fahrenheit",
    maximumFractionDigits: 0}})
  disablePumpTempC: KosConfigProperty<number>;

  @kosConfigProperty({ path: "system.app", attribute: "cupName" })
  cupName: KosConfigProperty<string>;

  
  @kosConfigProperty({ path: "system.app", attribute: "measurementSystem" })
  measurementSystem: KosConfigProperty<string>;

  constructor(modelId: string, options: ConfigurationOptions) {
    this.id = modelId;
  }

  get computedValue() {
    return this.resolveDelayMs.value + this.disablePumpTempC.value;
  }
}

const Registration = {
  registration: {
    [MODEL_TYPE]: {
      class: ConfigurationModelImpl,
      singleton: true,
    },
  },
  type: MODEL_TYPE,
  factory: Kos.Factory.create<ConfigurationModel, ConfigurationOptions>(
    MODEL_TYPE
  ),
};
export default Registration;
