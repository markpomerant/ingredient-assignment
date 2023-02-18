import { kosComponent, LoadingMessage } from "@coca-cola/kos-ui-components";
import React, { PropsWithChildren, useState } from "react";
import { useDispenserModel } from "../../hooks/dispenser";
// import { ConfigurationView } from "../configuration";
import { HolderContainer } from "../holder/holders";
import { IngredientSelect } from "../ingredient-container";
import { IHolderModel } from "../../models/holder/types";

interface Props {}

export const DispenserView: React.FunctionComponent<PropsWithChildren<Props>> =
  kosComponent(function DispenserView() {
    const { status, KosModelLoader } = useDispenserModel();
    const [selectedHolder, setSelectedHolder] = useState<IHolderModel>();
    return (
      <KosModelLoader {...status} loading={<LoadingMessage></LoadingMessage>}>
        <div
          style={{
            display: "flex",

            padding: 20,
          }}
        >
          <div style={{ flex: 3 }}>
            <HolderContainer
              selected={selectedHolder}
              onSelect={setSelectedHolder}
            ></HolderContainer>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <IngredientSelect
              disabled={false}
              onSelect={(ingredient: string) => {
                selectedHolder?.assignIngredient(ingredient);
              }}
              filter={selectedHolder?.type}
            ></IngredientSelect>
          </div>
        </div>

        {/* <ConfigurationView></ConfigurationView> */}
      </KosModelLoader>
    );
  });
