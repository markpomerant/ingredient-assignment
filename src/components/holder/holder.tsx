import { kosComponent } from "@coca-cola/kos-ui-components";
import React, { useCallback, useEffect, useState } from "react";
import { IHolderModel } from "../../models/holder";
import { IIngredientModel } from "../../models/ingredient";
import { Dropdown } from "../dropdown/dropdown";
import { InputSelect } from "../input-select/input-select";

import "./holder.css";

interface Props {
  holder: IHolderModel;
  onSelection: (holder: IHolderModel) => void;
  selected: boolean;
}
export const Holder: React.FunctionComponent<Props> = kosComponent(
  function Holder({ holder, onSelection, selected }) {
    const [pulled, setPulled] = useState(false);
    const [ingredient, setIngredient] = useState<IIngredientModel | undefined>(
      holder?.ingredient
    );
    const showButtons = !holder.canAssign || pulled;
    const holderClasses = [
      holder.canAssign && "not-assigned",
      "holder",
      selected && "selected",
      pulled && "pulled",
    ]
      .filter(Boolean)
      .join(" ");
    const handleIngredientToggle = useCallback(() => {
      if (pulled) {
        if (ingredient) {
          holder.assignIngredient(ingredient?.id);
        }
      } else {
        setIngredient(holder.ingredient);
        holder.deleteIngredient();
      }

      setPulled(!pulled);
    }, [holder, setPulled, setIngredient, ingredient, pulled]);
    return (
      <div className={holderClasses} onClick={() => onSelection(holder)}>
        <div>{holder.name}</div>
        <div>{holder?.ingredient?.name || ingredient?.name}</div>

        {showButtons && (
          <div
            style={{
              position: "absolute",
              top: 5,
              right: 5,
            }}
          >
            <Dropdown
              label="&#x2304;"
              onChange={(value) => {
                switch (value) {
                  case "clear":
                    setIngredient(undefined);
                    holder.deleteIngredient();
                    break;
                  case "pull":
                  case "insert":
                    handleIngredientToggle();
                    break;
                  default:
                    break;
                }
              }}
              options={[
                { value: "clear", label: "Clear", disabled: holder.canAssign },
                { value: "pull", label: "Pull", disabled: pulled },
                { value: "insert", label: "Insert", disabled: !pulled },
              ]}
            ></Dropdown>
          </div>
        )}
      </div>
    );
  }
);
