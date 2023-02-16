import { kosComponent, useContextModel } from "@coca-cola/kos-ui-components";
import React, { PropsWithChildren } from "react";
import { ConfigurationModel } from "../../models/configuration";
import { InputSelect } from "../input-select/input-select";
import { InputText } from "../input-text/input-text";

interface Props {}

export const ConfigurationProperties: React.FunctionComponent<
  PropsWithChildren<Props>
> = kosComponent(function ConfigurationProperties() {
  const model = useContextModel<ConfigurationModel>();

  return (
    <>
      <div
        style={{
          border: "solid 1px black",
          padding: 10,
          margin: 15,
          width: 400,
        }}
      >
        <InputText
          label="Cup Name:"
          value={model?.cupName.value}
          onChange={(val) => {
            model?.cupName.updateProperty(val);
          }}
        ></InputText>
        <span>Display Value: {model?.cupName.displayValue}</span>
      </div>
      <div
        style={{
          border: "solid 1px black",
          padding: 10,
          margin: 15,
          width: 400,
        }}
      >
        <InputText
          label="Disable Pump Temp:"
          value={model?.disablePumpTempC.value}
          onChange={(val) => {
            model?.disablePumpTempC.updateProperty(val);
          }}
        ></InputText>
        <span>Display Value: {model?.disablePumpTempC.displayValue}</span>
      </div>
      <div
        style={{
          border: "solid 1px black",
          padding: 10,
          margin: 15,
          width: 400,
        }}
      >
        <InputText
          label="Resolve Delay:"
          value={model?.resolveDelayMs.value}
          onChange={(val) => {
            model?.resolveDelayMs.updateProperty(val);
          }}
        ></InputText>
        <span>Display Value: {model?.resolveDelayMs.displayValue}</span>
      </div>
      <div
        style={{
          border: "solid 1px black",
          padding: 10,
          margin: 15,
          width: 400,
        }}
      >
        <InputSelect
          label="Measurement System:"
          defaultValue={model?.measurementSystem.displayValue}
          options={model?.measurementSystem.options}
          onChange={(val) => {
            model?.measurementSystem.updateProperty(val);
          }}
        ></InputSelect>
        <span>Display Value: {model?.measurementSystem.displayValue}</span>
      </div>

      <div>
        <h1>{model?.computedValue}</h1>
      </div>
    </>
  );
});
