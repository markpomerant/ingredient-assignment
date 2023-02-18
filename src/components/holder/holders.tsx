import { kosComponent, useContextModel } from "@coca-cola/kos-ui-components";
import React from "react";
import { IDispenserModel } from "../../models/dispenser";
import { IHolderModel } from "../../models/holder";

import { Holder } from "./holder";
import "./holder.css";

interface Props {
  onSelect: (holder: IHolderModel) => void;
  selected?: IHolderModel;
}
export const HolderContainer: React.FunctionComponent<Props> = kosComponent(
  function HolderContainer(props) {
    const dispenser = useContextModel<IDispenserModel>();
    const holders = ["WATER", "AMBIENT", "SYRUP"].map((key) => {
      const _holders =
        dispenser?.holders
          .getIndexByKey("type", key)
          .sort((a, b) => a.name.localeCompare(b.name, "en", { numeric: true }))
          .map((holder) => {
            return (
              <Holder
                selected={props.selected?.id === holder.id}
                onSelection={props.onSelect}
                key={holder.id}
                holder={holder}
              ></Holder>
            );
          }) || [];
      return (
        <div key={key} className={"holder-container"}>
          {_holders}
        </div>
      );
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
        {holders}
      </div>
    );
  }
);
