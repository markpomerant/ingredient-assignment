import { kosComponent, useContextModel } from "@coca-cola/kos-ui-components";
import React from "react";
import { IDispenserModel } from "../../models/dispenser";

import { Holder } from "./holder";
import "./holder.css";

export const HolderContainer: React.FunctionComponent = kosComponent(
  function HolderContainer() {
    const dispenser = useContextModel<IDispenserModel>();
    const holders =
      dispenser?.holders.data.map((holder) => {
        return <Holder key={holder.id} holder={holder}></Holder>;
      }) || [];
    return <div className={"holder-container"}>{holders}</div>;
  }
);
