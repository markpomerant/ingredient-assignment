import React, { useEffect, useState } from "react";
import { useIngredientContainerModel } from "../../hooks/ingredient-container";
import { HolderType } from "../../models/holder/types";
import { IIngredientModel } from "../../models/ingredient";
import { Button } from "../button";
import { Modal } from "../modal";
import "./ingredient.css";

interface Props {
  onSelect: (id: string) => void;
  disabled: boolean;
  filter: HolderType;
}
export const IngredientSelect: React.FunctionComponent<Props> = ({
  onSelect,
  disabled,
  filter,
}) => {
  const [selected, setSelected] = useState("");
  const [ingredients, setIngredients] = useState<IIngredientModel[]>([]);
  const [show, setShow] = useState(false);
  const { model } = useIngredientContainerModel();

  useEffect(() => {
    if (model?.container) {
      const ingredients = model?.container.getIndexByKey("holder", filter);
      setSelected(ingredients[0].id);
      setIngredients(ingredients);
    }
  }, [model, filter]);
  const options = ingredients?.map((ingredient) => {
    return (
      <div
        key={ingredient.id}
        onClick={() => setSelected(ingredient.id)}
        className={`ingredient ${ingredient.id === selected ? "selected" : ""}`}
      >
        {ingredient.name}
      </div>
    );
  });
  return (
    <>
      <Button disabled={disabled || !selected} onClick={() => setShow(true)}>
        Assign
      </Button>
      <Modal
        title={`Assign Ingredient`}
        onClose={() => setShow(false)}
        onSubmit={() => onSelect(selected)}
        show={show}
      >
        {options}
      </Modal>
    </>
  );
};
