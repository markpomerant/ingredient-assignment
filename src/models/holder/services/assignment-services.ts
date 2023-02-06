import { ServiceFactory, resolveServiceUrl } from "@coca-cola/kos-ui-core";
const { URL } = resolveServiceUrl("ASSIGNMENT_SERVICE");
const { getAll, postModel, deleteModel } = ServiceFactory.build({
    destinationAddress: "",
    basePath: `${URL}/api/kos/assignments`,
  });

export interface Assignment {
    ingredientId: string;
    holderPath: string;
    containerId?: string;

}
/**
 * @category Service
 * Retrieves the initial dispenser data.
 */
 export const getAssignments = async () => {

    const response = await getAll<Assignment>({});
    return response;
  };

  export const addAssignment = async (assignment:Assignment) => {

    const response = await postModel({model: assignment});
    return response;
  };

  export const deleteAssignment = async (id: string) => {
    const response = await deleteModel({id});
    return response;
  }