import { IKosDataModel, IKosModelContainer } from "@coca-cola/kos-ui-core";
import {IIngredientContainerModel} from "../../ingredient-container";

export interface IDispenserOptions {}

export interface IDispenserModel extends IDispenserOptions, IKosDataModel {
  id: string;
  ingredients: IIngredientContainerModel;  
  holders: IKosModelContainer<IHolderModel>;

}
