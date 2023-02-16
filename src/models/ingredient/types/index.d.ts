import { IKosDataModel } from "@coca-cola/kos-ui-core";

type BEV_TYPES = "CARB_BEV" | "FLAVOR" | "WATER" | "CARB" | "PLAIN_BEV"
export interface IIngredientOptions {
  name: string;
  type: BEV_TYPES,
  ratio: number
}

export interface IIngredientModel extends IIngredientOptions, IKosDataModel {
  id: string;
}
