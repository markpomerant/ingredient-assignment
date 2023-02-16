import { kosComponent } from "@coca-cola/kos-ui-components";
import React from "react";
import { IHolderModel } from "../../models/holder";
import { IngredientSelect } from "../ingredient-container/ingredient-select";

import "./holder.css";

interface Props {
  holder: IHolderModel;
}
export const Holder: React.FunctionComponent<Props> = kosComponent(
  function Holder({ holder }) {
    const holderClasses = [holder.canAssign && "not-assigned", "holder"]
      .filter(Boolean)
      .join(" ");
    return (
      <div className={holderClasses}>
        <div>{holder.name}</div>
        <div>{holder.ingredient || "Not Assigned"}</div>
        {holder.canAssign ? (
          <div>
            <IngredientSelect
              filter={holder.type}
              disabled={!holder.canAssign}
              onSelect={(ingredientId) => holder.assignIngredient(ingredientId)}
            ></IngredientSelect>
          </div>
        ) : (
          <div>
            <button
              disabled={holder.canAssign}
              onClick={() => holder.deleteIngredient()}
            >
              Unassign
            </button>
          </div>
        )}
      </div>
    );
  }
);
