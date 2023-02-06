import {IDispenserModel} from "../types";
import { KosLog } from "@coca-cola/kos-ui-core";
import {Holder, Services} from "../../holder";

const log = KosLog.getLogger("assignment-mappings");

export const mapAssignmentResponseToModel = (model: IDispenserModel) => (assignment: Services.Assignment) => {
    const holderPath = assignment.holderPath;
    const ingredientId = assignment.ingredientId;
    const ingredientModel = model.ingredients.container.getModel(ingredientId);
    const holder = model.holders.getModel(holderPath);

    if (holder && ingredientModel) {
     log.debug("updating ingredient assignment holder factory", holderPath, ingredientModel.name);
      holder.updateIngredientAssignment(ingredientModel.name);
    }
 }

 export const mapHolderResponseToModel = (model: IDispenserModel) => (holderData: Services.HolderResponse) => {
    log.debug("creating holder factory", holderData.path);
     const holder = Holder.factory(holderData.path)(holderData);
     model.holders.addModel(holder);
  }