import React, { useEffect, useState } from "react";
import { useIngredientContainerModel } from "../../hooks/ingredient-container";
import { HolderType } from "../../models/holder/types";
import { IIngredientModel } from "../../models/ingredient";
import "./ingredient.css";

interface Props {
  onSelect: (id: string) => void;
  disabled: boolean;
  filter?: HolderType;
}
export const IngredientSelect: React.FunctionComponent<Props> = ({
  onSelect,
  disabled,
  filter,
}) => {
  const [selected, setSelected] = useState("");
  const [ingredients, setIngredients] = useState<IIngredientModel[]>([]);
  const { model } = useIngredientContainerModel();

  useEffect(() => {
    if (model?.container) {
      const ingredients = filter
        ? model?.container.getIndexByKey("holder", filter)
        : model?.container.data;
      setIngredients(ingredients);
    }
  }, [model, filter]);

  const options = ingredients?.map((ingredient) => {
    return (
      <div
        key={ingredient.id}
        onClick={() => {
          setSelected(ingredient.id);
          onSelect(ingredient.id);
        }}
        className={`ingredient ${ingredient.id === selected ? "selected" : ""}`}
      >
        {ingredient.name}
      </div>
    );
  });
  return <>{options}</>;
};
