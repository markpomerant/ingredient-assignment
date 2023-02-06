import { kosModel, KosLog, Kos, kosDependency, IKosModelContainer, KosModelContainer, kosTopicHandler, ApiCallback } from "@coca-cola/kos-ui-core";
import { IDispenserModel, IDispenserOptions } from "./types";
import {IIngredientContainerModel, IngredientContainer} from "../ingredient-container";
import {Services, IHolderModel} from "../holder";
import {mapAssignmentResponseToModel, mapHolderResponseToModel} from "./mappings";
const MODEL_TYPE = "dispenser-model";

const log = KosLog.getLogger("dispenser-model");


const convertToAssignment = (data: ApiCallback): Services.Assignment => {
  const assignment: Services.Assignment = JSON.parse(data.body);
  return assignment as Services.Assignment;
}
@kosModel<IDispenserModel, IDispenserOptions>(MODEL_TYPE)
export class DispenserModel implements IDispenserModel {
  id: string;
  holders: IKosModelContainer<IHolderModel>;
  @kosDependency({modelType: IngredientContainer.type})
  ingredients!: IIngredientContainerModel;

  constructor(modelId: string) {
    log.debug("creating new instance of Dispenser Model");
    this.id = modelId;
    this.holders = new KosModelContainer();
  }

  async init() {
    log.debug("initializing dispenser");
  }
  async online(): Promise<void> {
    log.debug("calling online for dispenser model");
  }

  async ready() {
    log.debug("readying dispenser model");
  }
  async load(): Promise<void> {

    log.info("loading dispenser model");
    const holders = await Services.getHolders();
    holders?.data.forEach(mapHolderResponseToModel(this))
    const assignments = await Services.getAssignments();
    assignments?.data.forEach(mapAssignmentResponseToModel(this));
   }

   @kosTopicHandler({topic: "/kos/assignments/add", 
   websocket: true, 
   transform: convertToAssignment})
   addIngredientAssignment(data: Services.Assignment) {
       const ingredientId = data.ingredientId;
       const ingredientModel = this.ingredients.container.getModel(ingredientId);
      const holder = this.holders.getModel(data.holderPath);
      if (holder && ingredientModel) {
        holder.updateIngredientAssignment(ingredientModel.name);
       }
   }

   @kosTopicHandler({
    topic: "/kos/assignments/remove", 
    websocket: true, transform: (data) => {
       const assignment = JSON.parse(data.body);
       return assignment;
   }})
   removeIngredientAssignment(data: Services.Assignment) {
       const holder = this.holders.getModel(data.holderPath);
       if (holder) {
           holder.updateIngredientAssignment();
       }
   }

   getChildren(){
       return [this.ingredients, ...this.holders.data]
   }
}

const Registration = {
  registration: {
    [MODEL_TYPE]: {
      class: DispenserModel,
      singleton: true,
    },
  },
  type: MODEL_TYPE,
  factory: Kos.Factory.create<IDispenserModel, IDispenserOptions>(MODEL_TYPE),
};
export default Registration;
