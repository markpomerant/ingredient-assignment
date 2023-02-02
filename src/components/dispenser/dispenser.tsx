import { kosComponent, LoadingMessage } from "@coca-cola/kos-ui-components";
import React, { PropsWithChildren } from "react";
import { useDispenserModel } from "../../hooks/dispenser";

interface Props {}

export const DispenserView: React.FunctionComponent<PropsWithChildren<Props>> =
  kosComponent(function DispenserView() {
    const { status, KosModelLoader } = useDispenserModel();

    return (
      <KosModelLoader {...status} loading={<LoadingMessage></LoadingMessage>}>
        <div>Welcome to kOS</div>
        <div>{status?.model?.name}</div>
      </KosModelLoader>
    );
  });
