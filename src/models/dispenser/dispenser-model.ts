import { kosModel, KosLog, Kos, kosDependency, IKosModelContainer, KosModelContainer, kosTopicHandler } from "@coca-cola/kos-ui-core";
import { IDispenserModel, IDispenserOptions } from "./types";
import {IIngredientContainerModel, IngredientContainer} from "../ingredient-container";
import {Services, Holder, IHolderModel} from "../holder";
import {Assignment} from "../holder/services";
const MODEL_TYPE = "dispenser-model";

const log = KosLog.getLogger("dispenser-model");

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

  async load(): Promise<void> {

    
    const holders = await Services.getHolders();
    holders?.data.forEach((holderData) => {
       const holder = Holder.factory(holderData.path)(holderData);
       this.holders.addModel(holder);
    })
    const assignments = await Services.getAssignments();
    assignments?.data.forEach((assignment) => {
       const holderPath = assignment.holderPath;
       const ingredientId = assignment.ingredientId;
       const ingredientModel = this.ingredients.container.getModel(ingredientId);
       const holder = this.holders.getModel(holderPath);

       if (holder && ingredientModel) {
         holder.updateIngredientAssignment(ingredientModel.name);
       }
    });



   }

   @kosTopicHandler({topic: "/kos/assignments/add", websocket: true, transform: (data) => {
       const assignment = JSON.parse(data.body);
       return assignment;
   }})
   addIngredientAssignment(data: Assignment) {
       const ingredientId = data.ingredientId;
       const ingredientModel = this.ingredients.container.getModel(ingredientId);
      const holder = this.holders.getModel(data.holderPath);
      if (holder && ingredientModel) {
        holder.updateIngredientAssignment(ingredientModel.name);
       }
   }

   @kosTopicHandler({topic: "/kos/assignments/remove", websocket: true, transform: (data) => {
       const assignment = JSON.parse(data.body);
       return assignment;
   }})
   removeIngredientAssignment(data: Assignment) {
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
