import { kosComponent, LoadingMessage } from "@coca-cola/kos-ui-components";
import React, { PropsWithChildren } from "react";
import { useDispenserModel } from "../../hooks/dispenser";
import { HolderContainer } from "../holder/holders";

interface Props {}

export const DispenserView: React.FunctionComponent<PropsWithChildren<Props>> =
  kosComponent(function DispenserView() {
    const { status, KosModelLoader } = useDispenserModel();

    return (
      <KosModelLoader {...status} loading={<LoadingMessage></LoadingMessage>}>
        <HolderContainer></HolderContainer>
      </KosModelLoader>
    );
  });
