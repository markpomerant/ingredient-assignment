import { IKosDataModel } from "@coca-cola/kos-ui-core";

export interface IIngredientOptions {
  name: string;
}

export interface IIngredientModel extends IIngredientOptions, IKosDataModel {
  id: string;
}
