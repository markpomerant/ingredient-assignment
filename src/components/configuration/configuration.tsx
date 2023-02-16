import { kosComponent, LoadingMessage } from "@coca-cola/kos-ui-components";
import React, { PropsWithChildren } from "react";
import { useConfigurationModel } from "../../hooks/configuration";
import { ConfigurationProperties } from "./config-properties";

interface Props {}

export const ConfigurationView: React.FunctionComponent<
  PropsWithChildren<Props>
> = kosComponent(function ConfigurationView() {
  const { status, KosModelLoader } = useConfigurationModel();

  return (
    <KosModelLoader {...status} loading={<LoadingMessage></LoadingMessage>}>
      <ConfigurationProperties></ConfigurationProperties>
    </KosModelLoader>
  );
});
