import React, { useEffect, useState } from "react";
import { useIngredientContainerModel } from "../../hooks/ingredient-container";

interface Props {
  onSelect: (id: string) => void;
  disabled: boolean;
}
export const IngredientSelect: React.FunctionComponent<Props> = ({
  onSelect,
  disabled,
}) => {
  const [selected, setSelected] = useState("");
  const { model } = useIngredientContainerModel();
  useEffect(() => {
    if (model?.container) {
      setSelected(model.container.data[0].id);
    }
  }, [model]);
  const options = model?.container.data.map((ingredient) => {
    return (
      <option key={ingredient.id} value={ingredient.id}>
        {ingredient.name}
      </option>
    );
  });
  return (
    <div style={{ display: "flex", gap: "5px" }}>
      <select
        disabled={disabled}
        onChange={(e) => {
          setSelected(e.target.value);
        }}
      >
        {options}
      </select>
      <button
        disabled={disabled || !selected}
        onClick={() => onSelect(selected)}
      >
        Assign
      </button>
    </div>
  );
};
