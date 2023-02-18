import { IKosDataModel } from "@coca-cola/kos-ui-core";
import {IIngredientModel} from "../../ingredient";

export type HolderType = "AMBIENT" | "SYRUP" | "WATER";
export interface IHolderOptions {
  // the name of the holder.  will be specified at creation time.
  name: string;
  type: HolderType;
}

export interface IHolderModel extends IHolderOptions, IKosDataModel {

  // The model ID
  id: string;
  ingredient?: IIngredientModel;

  // updates the ingredient assignment
  // will be called by event handler when an assignment 
  // event is received
  updateIngredientAssignment(ingredient?: IIngredientModel);

  // update the assigned ingredient for this holder
  assignIngredient: (id: string) => Promise<void>;

  // remove the assigned ingredient from this holder;
  deleteIngredient: () => Promise<void>;

  // derived value indicating whether this holder can 
  // have an ingredient assigned.  
  canAssign: boolean;
}
