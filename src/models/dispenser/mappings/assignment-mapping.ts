import {IDispenserModel} from "../types";
import { KosLog } from "@coca-cola/kos-ui-core";
import {Holder, IHolderOptions, Services} from "../../holder";
import {HolderType} from "../../holder/types";

const log = KosLog.getLogger("assignment-mappings");

export const mapAssignmentResponseToModel = (model: IDispenserModel) => (assignment: Services.Assignment) => {
    const holderPath = assignment.holderPath;
    const ingredientId = assignment.ingredientId;
    const ingredientModel = model.ingredients.container.getModel(ingredientId);
    const holder = model.holders.getModel(holderPath);

    if (holder && ingredientModel) {
     log.debug("updating ingredient assignment holder factory", holderPath, ingredientModel);
      holder.updateIngredientAssignment(ingredientModel);
    }
 }

 export const mapHolderResponseToModel = (model: IDispenserModel) => (holderData: Services.HolderResponse) => {
    log.debug("creating holder factory", holderData.path);
    const {pumps, ...data} = holderData;
    const type: HolderType = pumps[0].type.includes("ambient") ? "AMBIENT" : pumps[0].type.includes("syrup") ? "SYRUP" : "WATER";
    const options:IHolderOptions = {...data, type};
     const holder = Holder.factory(holderData.path)(options);
     model.holders.addModel(holder);
  }