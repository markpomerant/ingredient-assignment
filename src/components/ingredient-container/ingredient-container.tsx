import { kosComponent, LoadingMessage } from "@coca-cola/kos-ui-components";
import React, { PropsWithChildren, useCallback } from "react";
import { useIngredientContainerModel } from "../../hooks/ingredient-container";
import { IngredientSelect } from "./ingredient-select";

interface Props {}

export const IngredientContainerView: React.FunctionComponent<
  PropsWithChildren<Props>
> = kosComponent(function IngredientContainerView() {
  const { status, KosModelLoader } = useIngredientContainerModel();
  const ingredientSelected = useCallback((id: string) => {
    alert(`selected ingredient with ID: ${id}`);
  }, []);
  return (
    <KosModelLoader {...status} loading={<LoadingMessage></LoadingMessage>}>
      <IngredientSelect
        disabled={false}
        onSelect={ingredientSelected}
      ></IngredientSelect>
    </KosModelLoader>
  );
});
