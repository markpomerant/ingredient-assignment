import { IKosDataModel, IKosModelContainer } from "@coca-cola/kos-ui-core";
import {IIngredientModel} from "../../ingredient";

export interface IIngredientContainerOptions {}

export interface IIngredientContainerModel
  extends IIngredientContainerOptions,
    IKosDataModel {
  id: string;
  container: IKosModelContainer<IIngredientModel>;

}
