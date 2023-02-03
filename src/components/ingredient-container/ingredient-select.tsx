import React, { useEffect, useState } from "react";
import { useIngredientContainerModel } from "../../hooks/ingredient-container";
import { Button } from "../button";
import { Modal } from "../modal";
import "./ingredient.css";

interface Props {
  onSelect: (id: string) => void;
  disabled: boolean;
}
export const IngredientSelect: React.FunctionComponent<Props> = ({
  onSelect,
  disabled,
}) => {
  const [selected, setSelected] = useState("");
  const [show, setShow] = useState(false);
  const { model } = useIngredientContainerModel();
  useEffect(() => {
    if (model?.container) {
      setSelected(model.container.data[0].id);
    }
  }, [model]);
  const options = model?.container.data.map((ingredient) => {
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
        onClose={() => setShow(false)}
        onSubmit={() => onSelect(selected)}
        show={show}
      >
        {options}
      </Modal>
    </>
  );
};
